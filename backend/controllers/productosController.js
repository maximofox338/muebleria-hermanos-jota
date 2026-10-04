const productos = require('../data/productos');

// GET /api/productos
const listarProductos = (req, res) => {
  res.json(productos);
};

// GET /api/productos/:id
const obtenerProductoPorId = (req, res, next) => {
  // Comparación exacta: "3" encuentra el producto 3, pero "03", "3.0" o "0x3" no
  const producto = productos.find((p) => String(p.id) === req.params.id);

  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    return next(error);
  }

  res.json(producto);
};

module.exports = { listarProductos, obtenerProductoPorId };
