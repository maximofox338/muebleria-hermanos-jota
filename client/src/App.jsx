import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Cart from './components/Cart.jsx';
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

// Lee el carrito guardado en localStorage. Si no hay o está dañado, arranca vacío.
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem('carrito'));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

function App() {
  // Si la página se abre con ?id=N, arrancamos directo en el detalle
  const [idProducto, setIdProducto] = useState(leerIdDeLaUrl);
  const [vista, setVista] = useState(idProducto ? 'detalle' : 'inicio');

  // El carrito es una lista de productos; la misma pieza puede estar más de una vez
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  // Cada vez que cambia el carrito, lo guardamos para no perderlo al recargar
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

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

  // Usamos la versión con función de setCarrito: siempre parte del carrito más reciente
  // (si se hace clic dos veces seguidas, se agregan las dos piezas)
  function agregarAlCarrito(producto) {
    setCarrito((anterior) => [...anterior, producto]);
  }

  // Quita solo la pieza de esa posición (si está repetida, se saca de a una)
  function quitarDelCarrito(posicion) {
    setCarrito((anterior) =>
      anterior.filter((producto, indice) => indice !== posicion)
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <>
      <Navbar vista={vista} cantidadCarrito={carrito.length} onIrA={irA} />

      <main>
        {vista === 'inicio' && <Home onIrA={irA} onVerDetalle={verDetalle} />}

        {vista === 'catalogo' && <ProductList onVerDetalle={verDetalle} />}

        {/* key: si cambia el id, React arma un detalle nuevo (vuelve a "cargando") */}
        {vista === 'detalle' && (
          <ProductDetail
            key={idProducto}
            id={idProducto}
            onIrA={irA}
            onAgregar={agregarAlCarrito}
          />
        )}

        {vista === 'carrito' && (
          <Cart
            carrito={carrito}
            onQuitar={quitarDelCarrito}
            onVaciar={vaciarCarrito}
            onIrA={irA}
            onVerDetalle={verDetalle}
          />
        )}

        {vista === 'contacto' && <ContactForm />}
      </main>

      <Footer />
    </>
  );
}

export default App;
