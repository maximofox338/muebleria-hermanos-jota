import { useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { useProductos } from '../hooks/useProductos.js';

// Pasa el texto a minúsculas, sin tildes y sin espacios en los extremos,
// así "cordoba" encuentra "Córdoba" y "  MESA " encuentra "Mesa".
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '') // saca las tildes (á → a)
    .toLowerCase()
    .trim();
}

// Catálogo: pide los productos a la API y los filtra por nombre con el buscador.
function ProductList({ onVerDetalle }) {
  // fetch a /api/productos con sus estados de carga y error (ver hooks/useProductos.js)
  const { productos, cargando, error } = useProductos();
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter((producto) =>
    normalizar(producto.nombre).includes(normalizar(busqueda))
  );

  // Qué se muestra en la galería según el estado del pedido
  let contenido;
  if (cargando) {
    contenido = <p className="aviso">Cargando catálogo…</p>;
  } else if (error) {
    contenido = (
      <p className="aviso">
        No pudimos cargar el catálogo. Probá de nuevo en un rato.
      </p>
    );
  } else if (productosFiltrados.length === 0) {
    contenido = (
      <p className="aviso">
        No encontramos piezas con ese nombre. Probá con otra palabra.
      </p>
    );
  } else {
    contenido = productosFiltrados.map((producto) => (
      <ProductCard
        key={producto.id}
        producto={producto}
        onVerDetalle={onVerDetalle}
      />
    ));
  }

  return (
    <section aria-labelledby="titulo-catalogo">
      <h1 id="titulo-catalogo">Catálogo</h1>
      <p>
        Once piezas pensadas para quedarse. Buscá por nombre o recorré la
        colección completa.
      </p>

      <div className="buscador">
        <label htmlFor="busqueda">Buscar por nombre</label>
        <input
          type="text"
          id="busqueda"
          name="busqueda"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
        />
      </div>

      <div className="galeria-productos">{contenido}</div>
    </section>
  );
}

export default ProductList;
