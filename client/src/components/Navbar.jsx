// Cabecera con el logo, el menú y el contador del carrito.
// No hay router: cada link avisa a App qué vista mostrar.
function Navbar({ vista, cantidadCarrito, onIrA }) {
  function irA(evento, nuevaVista) {
    evento.preventDefault(); // evita que el navegador recargue la página
    onIrA(nuevaVista);
  }

  // aria-current marca el link activo (el CSS lo subraya)
  function actual(activo) {
    return activo ? 'page' : undefined;
  }

  return (
    <header className="cabecera">
      <a
        href="/"
        className="logo"
        aria-label="Ir al inicio — Hermanos Jota"
        onClick={(evento) => irA(evento, 'inicio')}
      >
        <img
          src="/img/logo.svg"
          alt="Monograma hj de Hermanos Jota"
          width="120"
          height="120"
        />
      </a>

      <nav aria-label="Navegación principal">
        <ul>
          <li>
            <a
              href="/"
              aria-current={actual(vista === 'inicio')}
              onClick={(evento) => irA(evento, 'inicio')}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/"
              aria-current={actual(vista === 'catalogo' || vista === 'detalle')}
              onClick={(evento) => irA(evento, 'catalogo')}
            >
              Productos
            </a>
          </li>
          <li>
            <a
              href="/"
              aria-current={actual(vista === 'contacto')}
              onClick={(evento) => irA(evento, 'contacto')}
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>

      <a
        href="/"
        className="carrito"
        aria-label="Ver el carrito"
        aria-current={actual(vista === 'carrito')}
        onClick={(evento) => irA(evento, 'carrito')}
      >
        Carrito <span>{cantidadCarrito}</span>
      </a>
    </header>
  );
}

export default Navbar;
