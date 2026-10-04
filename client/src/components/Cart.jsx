import { formatearPrecio } from '../utils/formatearPrecio.js';

// Carrito: tabla con las piezas elegidas (una fila por pieza, con su cantidad),
// botón "Quitar" por fila, total y "Vaciar carrito".
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

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

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
          <a href="?vista=catalogo" className="boton" onClick={irAlCatalogo}>
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
                <th>Cant.</th>
                <th>Subtotal</th>
                <th>Quitar</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imagenURL}
                      alt={item.nombre + ' de Hermanos Jota'}
                      width="1024"
                      height="1024"
                      loading="lazy"
                    />
                    <a
                      href={'?id=' + item.id}
                      onClick={(evento) => {
                        evento.preventDefault();
                        onVerDetalle(item.id);
                      }}
                    >
                      {item.nombre}
                    </a>
                  </td>
                  <td>{item.cantidad}</td>
                  <td className="precio">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="boton-quitar"
                      aria-label={'Quitar una unidad de ' + item.nombre}
                      onClick={() => onQuitar(item.id)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="2">Total</th>
                <td className="precio" colSpan="2">
                  {formatearPrecio(total)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="acciones-carrito">
            <a href="?vista=catalogo" className="boton" onClick={irAlCatalogo}>
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
