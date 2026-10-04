import { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';

// Catálogo: pide los productos a la API y los filtra por nombre con el buscador.
function ProductList({ onVerDetalle }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  // [] = se ejecuta una sola vez, cuando el componente aparece
  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch('/api/productos');
        if (!respuesta.ok) {
          throw new Error('Error ' + respuesta.status);
        }
        const datos = await respuesta.json();
        setProductos(datos);
      } catch {
        setError('No pudimos cargar el catálogo. Probá de nuevo en un rato.');
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Qué se muestra en la galería según el estado del pedido
  let contenido;
  if (cargando) {
    contenido = <p className="aviso">Cargando catálogo…</p>;
  } else if (error) {
    contenido = <p className="aviso">{error}</p>;
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
