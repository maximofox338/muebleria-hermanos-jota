import { formatearPrecio } from '../utils/formatearPrecio.js';

// Carrito: tabla con las piezas elegidas, botón "Quitar" por fila, total y "Vaciar carrito".
// El estado vive en App; acá solo se muestra y se avisa con onQuitar / onVaciar.
function Cart({ carrito, onQuitar, onVaciar, onIrA, onVerDetalle }) {
  function irAlCatalogo(evento) {
    evento.preventDefault();
    onIrA('catalogo');
  }

  function confirmarVaciado() {
    if (window.confirm('¿Querés vaciar el carrito?')) {
      onVaciar();
    }
  }

  const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

  return (
    <section aria-labelledby="titulo-carrito">
      <h1 id="titulo-carrito">Carrito</h1>
      <p>
        Las piezas que elegiste. Podés quitar alguna o seguir recorriendo el
        catálogo.
      </p>

      {carrito.length === 0 ? (
        <>
          <p className="aviso">
            Tu carrito está vacío. Todavía no elegiste ninguna pieza.
          </p>
          <a href="/" className="boton" onClick={irAlCatalogo}>
            Ver catálogo
          </a>
        </>
      ) : (
        <>
          <table className="tabla-carrito">
            <caption>Piezas elegidas</caption>
            <thead>
              <tr>
                <th>Pieza</th>
                <th>Precio</th>
                <th>Quitar</th>
              </tr>
            </thead>
            <tbody>
              {/* La misma pieza puede estar dos veces: la key es la posición */}
              {carrito.map((producto, posicion) => (
                <tr key={posicion}>
                  <td>
                    <img
                      src={producto.imagenURL}
                      alt={producto.nombre + ' de Hermanos Jota'}
                      width="1024"
                      height="1024"
                    />
                    <a
                      href={'?id=' + producto.id}
                      onClick={(evento) => {
                        evento.preventDefault();
                        onVerDetalle(producto.id);
                      }}
                    >
                      {producto.nombre}
                    </a>
                  </td>
                  <td className="precio">{formatearPrecio(producto.precio)}</td>
                  <td>
                    <button
                      type="button"
                      className="boton-quitar"
                      onClick={() => onQuitar(posicion)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <td className="precio" colSpan="2">
                  {formatearPrecio(total)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="acciones-carrito">
            <a href="/" className="boton" onClick={irAlCatalogo}>
              Seguir eligiendo
            </a>
            <button
              type="button"
              className="boton-quitar"
              onClick={confirmarVaciado}
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
