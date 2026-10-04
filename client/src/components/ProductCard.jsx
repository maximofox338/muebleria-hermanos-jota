import { formatearPrecio } from '../utils/formatearPrecio.js';

// Tarjeta de un producto (foto, nombre, precio). Solo muestra lo que recibe por props.
function ProductCard({ producto, onVerDetalle }) {
  function manejarClick(evento) {
    evento.preventDefault(); // el href queda para abrir el link en otra pestaña
    onVerDetalle(producto.id);
  }

  return (
    <article className="tarjeta-producto">
      <a href={'?id=' + producto.id} onClick={manejarClick}>
        <img
          src={producto.imagenURL}
          alt={producto.nombre + ' de Hermanos Jota'}
          width="1024"
          height="1024"
          loading="lazy"
        />
        <h3>{producto.nombre}</h3>
        <p className="precio">{formatearPrecio(producto.precio)}</p>
      </a>
    </article>
  );
}

export default ProductCard;
