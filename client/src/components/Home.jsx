import { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';

// Los mismos destacados que el sitio original, en este orden
const idsDestacados = [7, 4, 1];

// Inicio: hero, piezas destacadas y la sección "Nosotros".
function Home({ onIrA, onVerDetalle }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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
        setError('No pudimos cargar las piezas. Probá de nuevo en un rato.');
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  // Buscamos cada id destacado dentro de la lista (y salteamos los que no estén)
  const destacados = idsDestacados
    .map((id) => productos.find((producto) => producto.id === id))
    .filter((producto) => producto !== undefined);

  return (
    <>
      <section className="hero-banner" aria-labelledby="titulo-principal">
        <h1 id="titulo-principal">Redescubrir el arte de vivir</h1>
        <p>
          Muebles hechos a mano en San Cristóbal, con maderas nobles y el tiempo
          que cada pieza merece. Cada una cuenta la historia de manos expertas y
          materiales nobles.
        </p>
        <a
          href="/"
          className="boton"
          onClick={(evento) => {
            evento.preventDefault();
            onIrA('catalogo');
          }}
        >
          Ver catálogo
        </a>
      </section>

      <section aria-labelledby="titulo-destacados">
        <h2 id="titulo-destacados">Piezas destacadas</h2>
        <div className="galeria-productos">
          {cargando && <p className="aviso">Cargando piezas…</p>}
          {error && <p className="aviso">{error}</p>}
          {destacados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onVerDetalle={onVerDetalle}
            />
          ))}
        </div>
      </section>

      <section id="nosotros" aria-labelledby="titulo-nosotros">
        <h2 id="titulo-nosotros">Nosotros</h2>
        <p>
          Somos un taller familiar en el barrio de San Cristóbal. Trabajamos con
          maderas nativas certificadas, acabados naturales y la calma de hacer
          las cosas bien. Herencia e innovación: la calidez de los años 60 con
          la <strong>conciencia de hoy</strong>.
        </p>

        <aside aria-labelledby="titulo-sustentabilidad">
          <h3 id="titulo-sustentabilidad">Cómo trabajamos</h3>
          <ul>
            <li>Madera certificada FSC de bosques responsables argentinos</li>
            <li>Prioridad a maderas nativas: algarrobo, quebracho, caldén</li>
            <li>Solo acabados y adhesivos de bajo COV</li>
            <li>Proveedores locales dentro del Gran Buenos Aires</li>
            <li>30% mínimo de materiales recuperados o reciclados</li>
            <li>Cero plásticos de un solo uso en toda la cadena</li>
          </ul>
        </aside>
      </section>
    </>
  );
}

export default Home;
