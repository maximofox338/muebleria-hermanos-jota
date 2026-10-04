// Pie de página: datos de contacto del manual de marca.
function Footer() {
  return (
    <footer>
      <section className="pie-columna">
        <h2>Showroom y taller</h2>
        <address>
          Hermanos Jota — Casa Taller
          <br />
          Av. San Juan 2847
          <br />
          C1232AAB — Barrio de San Cristóbal
          <br />
          Ciudad Autónoma de Buenos Aires, Argentina
        </address>
      </section>

      <section className="pie-columna">
        <h2>Horarios</h2>
        <p>Lunes a Viernes: 10:00 – 19:00</p>
        <p>Sábados: 10:00 – 14:00</p>
      </section>

      <section className="pie-columna">
        <h2>Contacto</h2>
        <ul>
          <li>
            <a href="mailto:info@hermanosjota.com.ar">
              info@hermanosjota.com.ar
            </a>
          </li>
          <li>
            <a href="mailto:ventas@hermanosjota.com.ar">
              ventas@hermanosjota.com.ar
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/hermanosjota_ba"
              target="_blank"
              rel="noopener noreferrer"
            >
              @hermanosjota_ba
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/541145678900"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +54 11 4567-8900
            </a>
          </li>
        </ul>
      </section>

      <p className="copyright">
        &copy; 2026 Hermanos Jota. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
