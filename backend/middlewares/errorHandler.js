// Ninguna ruta respondió: se arma un error 404 y se pasa al manejador central.
const notFound = (req, res, next) => {
  const error = new Error(
    `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  );
  error.status = 404;
  next(error);
};

// Manejador centralizado. Express lo reconoce como de errores por tener 4 argumentos.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) console.error(err);

  const respuesta = {
    message: status === 500 ? 'Error interno del servidor' : err.message,
  };
  if (process.env.NODE_ENV !== 'production') respuesta.stack = err.stack;

  res.status(status).json(respuesta);
};

module.exports = { notFound, errorHandler };
