import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ContactForm from './components/ContactForm.jsx';

// Título de la pestaña para cada vista
const titulos = {
  inicio: 'Inicio',
  catalogo: 'Productos',
  detalle: 'Producto',
  carrito: 'Carrito',
  contacto: 'Contacto',
};

function App() {
  // Vista actual: no usamos router, App decide qué mostrar
  const [vista, setVista] = useState('inicio');

  useEffect(() => {
    document.title = 'Hermanos Jota | ' + titulos[vista];
  }, [vista]);

  function irA(nuevaVista) {
    setVista(nuevaVista);
    window.scrollTo(0, 0);
  }

  return (
    <>
      {/* El carrito llega en el PR de estado: por ahora el contador es 0 */}
      <Navbar vista={vista} cantidadCarrito={0} onIrA={irA} />

      <main>
        {vista === 'inicio' && (
          <section>
            <h1>Inicio</h1>
            <p className="aviso">Próximamente.</p>
          </section>
        )}

        {vista === 'catalogo' && (
          <section>
            <h1>Catálogo</h1>
            <p className="aviso">Próximamente.</p>
          </section>
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
