import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import ContactForm from './components/ContactForm.jsx';

// Título de la pestaña para cada vista
const titulos = {
  inicio: 'Inicio',
  catalogo: 'Productos',
  detalle: 'Producto',
  carrito: 'Carrito',
  contacto: 'Contacto',
};

// Lee el id del producto de la URL (?id=3). Devuelve null si no hay.
function leerIdDeLaUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

function App() {
  // Si la página se abre con ?id=N, arrancamos directo en el detalle
  const [idProducto, setIdProducto] = useState(leerIdDeLaUrl);
  const [vista, setVista] = useState(idProducto ? 'detalle' : 'inicio');

  useEffect(() => {
    document.title = 'Hermanos Jota | ' + titulos[vista];
  }, [vista]);

  // Botón "atrás"/"adelante" del navegador: mostramos la vista de esa entrada del historial
  useEffect(() => {
    function alMoverseEnElHistorial(evento) {
      const id = leerIdDeLaUrl();
      if (id) {
        setIdProducto(id);
        setVista('detalle');
      } else {
        // La primera entrada no tiene estado guardado: es el inicio
        setVista(evento.state ? evento.state.vista : 'inicio');
      }
    }

    window.addEventListener('popstate', alMoverseEnElHistorial);
    return () => window.removeEventListener('popstate', alMoverseEnElHistorial);
  }, []);

  function irA(nuevaVista) {
    setVista(nuevaVista);
    // Guardamos la vista en el historial y sacamos el ?id= de la URL
    window.history.pushState(
      { vista: nuevaVista },
      '',
      window.location.pathname
    );
    window.scrollTo(0, 0);
  }

  function verDetalle(id) {
    setIdProducto(id);
    setVista('detalle');
    // La URL queda como ?id=N: se puede compartir o recargar
    window.history.pushState({ vista: 'detalle' }, '', '?id=' + id);
    window.scrollTo(0, 0);
  }

  return (
    <>
      {/* El carrito llega en el PR de estado: por ahora el contador es 0 */}
      <Navbar vista={vista} cantidadCarrito={0} onIrA={irA} />

      <main>
        {vista === 'inicio' && <Home onIrA={irA} onVerDetalle={verDetalle} />}

        {vista === 'catalogo' && <ProductList onVerDetalle={verDetalle} />}

        {/* key: si cambia el id, React arma un detalle nuevo (vuelve a "cargando") */}
        {vista === 'detalle' && (
          <ProductDetail key={idProducto} id={idProducto} onIrA={irA} />
        )}

        {vista === 'carrito' && (
          <section>
            <h1>Carrito</h1>
            <p className="aviso">Próximamente.</p>
          </section>
        )}

        {vista === 'contacto' && <ContactForm />}
      </main>

      <Footer />
    </>
  );
}

export default App;
