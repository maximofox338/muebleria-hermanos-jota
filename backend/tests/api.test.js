const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');

let server;
let baseURL;

before(async () => {
  server = app.listen(0); // puerto libre elegido por el sistema
  await new Promise((resolve) => server.once('listening', resolve));
  baseURL = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('una ruta inexistente responde 404 con { message }', async () => {
  const res = await fetch(`${baseURL}/api/no-existe`);
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.equal(body.message, 'Ruta no encontrada: GET /api/no-existe');
});

test('un JSON mal formado responde 400 con { message }', async () => {
  const res = await fetch(`${baseURL}/api/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{ mal json',
  });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).message);
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

test('GET /api/productos/:id con id inexistente responde 404', async () => {
  for (const id of ['999', 'abc']) {
    const res = await fetch(`${baseURL}/api/productos/${id}`);
    assert.equal(res.status, 404);
    assert.equal((await res.json()).message, 'Producto no encontrado');
  }
});
