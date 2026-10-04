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

// Vistas que se abren con ?vista=... (el detalle usa ?id=N y el inicio no lleva nada)
const vistasConUrl = ['catalogo', 'carrito', 'contacto'];

// Lee la URL y devuelve qué hay que mostrar:
//   ?id=3           → detalle del producto 3
//   ?vista=contacto → esa vista
//   cualquier otra  → inicio
function leerUrl() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('id');
  if (id) {
    return { vista: 'detalle', id };
  }
  const vista = parametros.get('vista');
  return { vista: vistasConUrl.includes(vista) ? vista : 'inicio', id: null };
}

// Lo inverso: la URL que le corresponde a cada vista
function urlDe(vista, id) {
  if (vista === 'detalle') return '?id=' + id;
  if (vista === 'inicio') return window.location.pathname;
  return '?vista=' + vista;
}

// Lee el carrito guardado. Si falta, está dañado o tiene datos raros, arranca vacío
// (o sin las piezas inválidas), así un dato corrupto nunca rompe la página.
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem('carrito'));
    if (!Array.isArray(guardado)) return [];
    return guardado.filter(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'number' &&
        typeof item.nombre === 'string' &&
        typeof item.precio === 'number' &&
        typeof item.imagenURL === 'string' &&
        Number.isInteger(item.cantidad) &&
        item.cantidad > 0
    );
  } catch {
    return [];
  }
}

function App() {
  // La vista y el producto salen de la URL: así se puede recargar o compartir cualquier pantalla
  const [vista, setVista] = useState(() => leerUrl().vista);
  const [idProducto, setIdProducto] = useState(() => leerUrl().id);

  // Carrito: una fila por pieza, con su cantidad → [{ id, nombre, precio, imagenURL, cantidad }]
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  // Cada vez que cambia el carrito, lo guardamos para no perderlo al recargar
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch {
      // Navegador sin almacenamiento disponible: el carrito sigue funcionando en memoria
    }
  }, [carrito]);

  useEffect(() => {
    document.title = 'Hermanos Jota | ' + titulos[vista];
  }, [vista]);

  // Botones "atrás"/"adelante" del navegador: mostramos lo que diga la URL
  useEffect(() => {
    function alMoverseEnElHistorial() {
      const ubicacion = leerUrl();
      setVista(ubicacion.vista);
      setIdProducto(ubicacion.id);
    }

    window.addEventListener('popstate', alMoverseEnElHistorial);
    return () => window.removeEventListener('popstate', alMoverseEnElHistorial);
  }, []);

  // Cambia de vista y deja la URL al día (?vista=... o ?id=N)
  function navegar(nuevaVista, nuevoId = null) {
    setVista(nuevaVista);
    setIdProducto(nuevoId);

    const destino = new URL(urlDe(nuevaVista, nuevoId), window.location.href);
    // Si ya estamos en esa URL no sumamos una entrada repetida al historial
    if (destino.href !== window.location.href) {
      window.history.pushState(null, '', destino);
    }
    window.scrollTo(0, 0);
  }

  function irA(nuevaVista) {
    navegar(nuevaVista);
  }

  function verDetalle(id) {
    navegar('detalle', String(id));
  }

  // Los setCarrito usan la versión con función: siempre parten del carrito más reciente
  // (si se hace clic dos veces seguidas, se suman las dos unidades)
  function agregarAlCarrito(producto) {
    setCarrito((anterior) => {
      const yaEsta = anterior.some((item) => item.id === producto.id);
      if (yaEsta) {
        return anterior.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      const { id, nombre, precio, imagenURL } = producto;
      return [...anterior, { id, nombre, precio, imagenURL, cantidad: 1 }];
    });
  }

  // Quita una unidad; si era la última, la pieza sale del carrito
  function quitarDelCarrito(id) {
    setCarrito((anterior) =>
      anterior
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const cantidadEnCarrito = carrito.reduce(
    (suma, item) => suma + item.cantidad,
    0
  );

  return (
    <>
      <Navbar vista={vista} cantidadCarrito={cantidadEnCarrito} onIrA={irA} />

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
