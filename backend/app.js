// Arma la app sin levantarla: server.js hace el listen y los tests usan un puerto libre.
const express = require('express');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(logger);
app.use(express.json());

// Rutas de la API (se montan acá)

// Siempre al final: primero el 404 atrapa-todo, después el manejador de errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;
