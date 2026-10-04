import { useState } from 'react';

// Un email válido tiene texto, luego "@", luego texto con un punto en el medio.
function emailEsValido(email) {
  const posicionArroba = email.indexOf('@');
  const posicionPunto = email.lastIndexOf('.');

  return (
    posicionArroba > 0 &&
    posicionPunto > posicionArroba + 1 &&
    posicionPunto < email.length - 1
  );
}

// Formulario de contacto con inputs controlados (value + onChange)
// y la misma validación que el sitio original.
function ContactForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim();
    const mensajeLimpio = mensaje.trim();

    // Arrancamos sin errores y vamos sumando los que encontremos
    const nuevosErrores = {};

    if (nombreLimpio === '') {
      nuevosErrores.nombre = 'Contanos tu nombre para poder responderte.';
    }

    if (emailLimpio === '') {
      nuevosErrores.email = 'Necesitamos un email para escribirte.';
    } else if (!emailEsValido(emailLimpio)) {
      nuevosErrores.email =
        'Ese email no parece completo. Revisalo, por favor.';
    }

    if (mensajeLimpio === '') {
      nuevosErrores.mensaje =
        'Dejanos unas líneas: ¿qué pieza o espacio tenés en mente?';
    }

    setErrores(nuevosErrores);

    // Si no hubo ningún error, el formulario es válido
    if (Object.keys(nuevosErrores).length === 0) {
      setExito(
        'Gracias, ' +
          nombreLimpio +
          '. Recibimos tu mensaje y te escribimos a la brevedad.'
      );
      setNombre('');
      setEmail('');
      setMensaje('');
    } else {
      setExito('');
    }
  }

  return (
    <section aria-labelledby="titulo-contacto">
      <h1 id="titulo-contacto">Contacto</h1>
      <p>
        Contanos qué espacio querés transformar. Te respondemos con calma y en
        persona.
      </p>

      <div className="contacto-contenido">
        {/* noValidate: la validación la hacemos nosotros, sin "required" */}
        <form
          className="formulario-contacto"
          noValidate
          onSubmit={manejarEnvio}
        >
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              aria-describedby="error-nombre"
            />
            <p className="error" id="error-nombre">
              {errores.nombre}
            </p>
          </div>

          <div className="campo">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              aria-describedby="error-email"
            />
            <p className="error" id="error-email">
              {errores.email}
            </p>
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={mensaje}
              onChange={(evento) => setMensaje(evento.target.value)}
              aria-describedby="error-mensaje"
            />
            <p className="error" id="error-mensaje">
              {errores.mensaje}
            </p>
          </div>

          <button type="submit" className="boton">
            Enviar mensaje
          </button>

          <p className="exito">{exito}</p>
        </form>

        <aside className="showroom" aria-labelledby="titulo-showroom">
          <h3 id="titulo-showroom">Showroom y taller</h3>
          <address>
            Hermanos Jota — Casa Taller
            <br />
            Av. San Juan 2847
            <br />
            C1232AAB — Barrio de San Cristóbal
            <br />
            Ciudad Autónoma de Buenos Aires, Argentina
          </address>

          <h3>Horarios</h3>
          <p>Lunes a Viernes: 10:00 – 19:00</p>
          <p>Sábados: 10:00 – 14:00</p>

          <h3>Escribinos</h3>
          <ul>
            <li>
              Consultas:{' '}
              <a href="mailto:info@hermanosjota.com.ar">
                info@hermanosjota.com.ar
              </a>
            </li>
            <li>
              Ventas:{' '}
              <a href="mailto:ventas@hermanosjota.com.ar">
                ventas@hermanosjota.com.ar
              </a>
            </li>
            <li>
              Instagram:{' '}
              <a
                href="https://www.instagram.com/hermanosjota_ba"
                target="_blank"
                rel="noopener noreferrer"
              >
                @hermanosjota_ba
              </a>
            </li>
            <li>
              WhatsApp:{' '}
              <a
                href="https://wa.me/541145678900"
                target="_blank"
                rel="noopener noreferrer"
              >
                +54 11 4567-8900
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default ContactForm;
