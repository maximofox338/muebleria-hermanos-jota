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
