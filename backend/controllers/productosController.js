const productos = require('../data/productos');

// GET /api/productos
const listarProductos = (req, res) => {
  res.json(productos);
};

// GET /api/productos/:id
const obtenerProductoPorId = (req, res, next) => {
  const producto = productos.find((p) => p.id === Number(req.params.id));

  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    return next(error);
  }

  res.json(producto);
};

module.exports = { listarProductos, obtenerProductoPorId };
