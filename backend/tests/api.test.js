const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');
const { errorHandler } = require('../middlewares/errorHandler');

let server;
let baseURL;

before(async () => {
  server = app.listen(0); // puerto libre elegido por el sistema
  await new Promise((resolve) => server.once('listening', resolve));
  baseURL = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('una ruta inexistente responde 404 con { message } y sin stack', async () => {
  const res = await fetch(`${baseURL}/api/no-existe`);
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), {
    message: 'Ruta no encontrada: GET /api/no-existe',
  });
});

test('un JSON mal formado responde 400 con mensaje en español', async () => {
  const res = await fetch(`${baseURL}/api/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{ mal json',
  });
  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), {
    message: 'El cuerpo de la petición no es un JSON válido',
  });
});

test('un error inesperado responde 500 sin detalles internos', () => {
  const res = {
    headersSent: false,
    status(codigo) {
      this.codigo = codigo;
      return this;
    },
    json(cuerpo) {
      this.cuerpo = cuerpo;
    },
  };
  const consoleError = console.error;
  console.error = () => {}; // el error se loguea a propósito: lo silenciamos en el test
  errorHandler(new Error('falló algo interno'), {}, res, () => {});
  console.error = consoleError;

  assert.equal(res.codigo, 500);
  assert.deepEqual(res.cuerpo, { message: 'Error interno del servidor' });
});

test('GET /api/productos devuelve los 11 productos', async () => {
  const res = await fetch(`${baseURL}/api/productos`);
  assert.equal(res.status, 200);
  const productos = await res.json();
  assert.equal(productos.length, 11);
  assert.deepEqual(Object.keys(productos[0]), [
    'id',
    'nombre',
    'precio',
    'imagenURL',
    'descripcion',
    'especificaciones',
  ]);
});

test('GET /api/productos/:id devuelve el producto pedido', async () => {
  const res = await fetch(`${baseURL}/api/productos/3`);
  assert.equal(res.status, 200);
  const producto = await res.json();
  assert.equal(producto.id, 3);
  assert.equal(producto.nombre, 'Butaca Mendoza');
});

test('GET /api/productos/:id con id inexistente o mal escrito responde 404', async () => {
  for (const id of ['999', 'abc', '0', '03', '3.0', '0x3', '%203']) {
    const res = await fetch(`${baseURL}/api/productos/${id}`);
    assert.equal(res.status, 404, `id "${id}" debería dar 404`);
    assert.deepEqual(await res.json(), { message: 'Producto no encontrado' });
  }
});
