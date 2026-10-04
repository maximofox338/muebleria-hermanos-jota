// Ninguna ruta respondió: se arma un error 404 y se pasa al manejador central.
const notFound = (req, res, next) => {
  const error = new Error(
    `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  );
  error.status = 404;
  next(error);
};

// Manejador centralizado. Express lo reconoce como de errores por tener 4 argumentos.
// El cliente siempre recibe { message }; el detalle técnico (stack) queda solo en la consola.
const errorHandler = (err, req, res, next) => {
  // Si la respuesta ya empezó a enviarse, se delega al manejador por defecto de Express
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  let message = err.message;

  if (status === 500) {
    console.error(err);
    message = 'Error interno del servidor';
  } else if (err.type === 'entity.parse.failed') {
    // Lo genera express.json() cuando el body no es un JSON válido
    message = 'El cuerpo de la petición no es un JSON válido';
  }

  res.status(status).json({ message });
};

module.exports = { notFound, errorHandler };
