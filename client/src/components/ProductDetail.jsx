import { useEffect, useState } from 'react';
import { formatearPrecio } from '../utils/formatearPrecio.js';

// Detalle de un producto: lo pide a la API con el id que llega por props (sale de ?id= en la URL).
// onAgregar es opcional: si no llega, no se muestra el botón del carrito.
function ProductDetail({ id, onIrA, onAgregar }) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    async function cargarProducto() {
      try {
        const respuesta = await fetch(
          '/api/productos/' + encodeURIComponent(id)
        );
        if (respuesta.status === 404) {
          setNoEncontrado(true);
          return;
        }
        if (!respuesta.ok) {
          throw new Error('Error ' + respuesta.status);
        }
        const datos = await respuesta.json();
        setProducto(datos);
        document.title = 'Hermanos Jota | ' + datos.nombre;
      } catch {
        setError('No pudimos cargar la pieza. Probá de nuevo en un rato.');
      } finally {
        setCargando(false);
      }
    }

    cargarProducto();
  }, [id]);

  function agregarAlCarrito() {
    onAgregar(producto);
    setAgregado(true);
  }

  function irAlCatalogo(evento) {
    evento.preventDefault();
    onIrA('catalogo');
  }

  // Renderizado condicional: un solo contenido según el estado del pedido
  let contenido;
  if (cargando) {
    contenido = <p className="aviso">Cargando la pieza…</p>;
  } else if (noEncontrado) {
    contenido = (
      <>
        <p className="aviso">
          No encontramos esa pieza. Volvé al catálogo para elegir otra.
        </p>
        <a href="/" className="boton" onClick={irAlCatalogo}>
          Ver catálogo
        </a>
      </>
    );
  } else if (error) {
    contenido = <p className="aviso">{error}</p>;
  } else {
    contenido = (
      <>
        <div className="detalle-imagen">
          <img
            src={producto.imagenURL}
            alt={producto.nombre + ', pieza artesanal de Hermanos Jota'}
            width="1024"
            height="1024"
          />
        </div>

        <section className="detalle-info">
          <h1>{producto.nombre}</h1>
          <p className="precio">{formatearPrecio(producto.precio)}</p>
          <p>{producto.descripcion}</p>

          {onAgregar && (
            <>
              <button
                type="button"
                className="boton"
                onClick={agregarAlCarrito}
              >
                Añadir al Carrito
              </button>
              <p className="exito">
                {agregado && producto.nombre + ' ya está en tu carrito.'}
              </p>
            </>
          )}

          <table className="ficha-tecnica">
            <caption>Ficha técnica</caption>
            <thead>
              <tr>
                <th>Especificación</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {producto.especificaciones.map((especificacion) => (
                <tr key={especificacion.nombre}>
                  <th>{especificacion.nombre}</th>
                  <td>{especificacion.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </>
    );
  }

  return (
    <>
      <article className="detalle">{contenido}</article>

      <aside aria-labelledby="titulo-herencia">
        <h3 id="titulo-herencia">Programa "Herencia Viva"</h3>
        <ul>
          <li>Garantía extendida: 10 años en estructura, 5 años en acabados</li>
          <li>Servicio de restauración de piezas antiguas</li>
          <li>Taller de cuidados: capacitación gratuita para clientes</li>
          <li>
            Recompra garantizada: hasta 40% del valor en piezas bien cuidadas
          </li>
          <li>Certificado de trazabilidad del origen de cada material</li>
        </ul>
      </aside>
    </>
  );
}

export default ProductDetail;
