import { useEffect, useState } from 'react';
import { formatearPrecio } from '../utils/formatearPrecio.js';

// Detalle de un producto: lo pide a la API con el id que llega por props (sale de ?id= en la URL).
function ProductDetail({ id, onIrA, onAgregar }) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    // Si el usuario se va antes de que llegue la respuesta, la ignoramos
    let ignorar = false;

    async function cargarProducto() {
      try {
        const respuesta = await fetch(
          '/api/productos/' + encodeURIComponent(id)
        );
        if (respuesta.status === 404) {
          if (!ignorar) setNoEncontrado(true);
          return;
        }
        if (!respuesta.ok) {
          throw new Error('Error ' + respuesta.status);
        }
        const datos = await respuesta.json();
        if (!ignorar) setProducto(datos);
      } catch {
        if (!ignorar) setError(true);
      } finally {
        if (!ignorar) setCargando(false);
      }
    }

    cargarProducto();
    return () => {
      ignorar = true;
    };
  }, [id]);

  // Cuando llega la pieza, el título de la pestaña pasa a ser su nombre
  useEffect(() => {
    if (producto) {
      document.title = 'Hermanos Jota | ' + producto.nombre;
    }
  }, [producto]);

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
        <a href="?vista=catalogo" className="boton" onClick={irAlCatalogo}>
          Ver catálogo
        </a>
      </>
    );
  } else if (error) {
    contenido = (
      <p className="aviso">
        No pudimos cargar la pieza. Probá de nuevo en un rato.
      </p>
    );
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

          <button type="button" className="boton" onClick={agregarAlCarrito}>
            Añadir al Carrito
          </button>
          {/* role="status": los lectores de pantalla anuncian el mensaje */}
          <p className="exito" role="status">
            {agregado && producto.nombre + ' ya está en tu carrito.'}
          </p>

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
