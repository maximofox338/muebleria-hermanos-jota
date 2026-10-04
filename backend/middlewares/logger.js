// Middleware global: registra método, URL y fecha de cada petición.
const logger = (req, res, next) => {
  console.log(
    `[${req.method}] ${req.originalUrl} - ${new Date().toLocaleString('es-AR', { hour12: false })}`
  );
  next();
};

module.exports = logger;
