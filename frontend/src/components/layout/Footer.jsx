import { Link } from "react-router-dom";
import { asset } from "../common/UI";
import SocialIcon from '../common/SocialIcon';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="brand">
            <img src={asset("/images/isotipo-mono.svg")} alt="" />
            <span>
              <strong>ALMA NÓMADA</strong>
              <small>Viaja libre. Vive a tu manera.</small>
            </span>
          </Link>
          <p>
            Hay un mundo por descubrir.
            <br />Y muchas formas de hacerlo tuyo.
          </p>
        </div>
        <div>
          <h3>Encuentra tu camino</h3>
          <Link to="/destinos">Destinos</Link>
          <Link to="/experiencias">Experiencias Alma</Link>
          <Link to="/resumen">Mi viaje</Link>
        </div>
        <div>
          <h3>Conversemos</h3>
          <Link to="/nosotras">Nuestra historia</Link>
          <Link to="/contacto">Contacto</Link>
          <span>Una comunidad de mujeres viajeras.</span>
          <div className="social-links" aria-label="Redes sociales">
            <a
              href="https://www.tiktok.com/login"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Iniciar sesión en TikTok en una nueva pestaña"
              title="TikTok"
            >
              <SocialIcon name="tiktok"/>
              <span className="sr-only">TikTok</span>
            </a>
            <a
              href="https://www.instagram.com/accounts/login/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Iniciar sesión en Instagram en una nueva pestaña"
              title="Instagram"
            >
              <SocialIcon name="instagram"/>
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/signin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Iniciar sesión en YouTube en una nueva pestaña"
              title="YouTube"
            >
              <SocialIcon name="youtube"/>
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Alma Nómada · Proyecto académico</span>
        <span>
          Datos, servicios y solicitudes de demostración. Sin pagos reales.
        </span>
      </div>
    </footer>
  );
}
