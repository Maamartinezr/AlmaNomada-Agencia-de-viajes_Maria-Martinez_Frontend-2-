import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "../common/Icon";
import { asset } from "../common/UI";
const links = [
  ["/", "Inicio"],
  ["/nosotras", "Nosotras"],
  ["/experiencias", "Experiencias"],
  ["/servicios", "Servicios adicionales"],
  ["/contacto", "Contacto"],
];
export default function Header({ onSkipToContent }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <a
        className="skip"
        href="#contenido"
        onClick={(event) => {
          event.preventDefault();
          onSkipToContent();
        }}
      >
        Saltar al contenido
      </a>
      <header className="header">
        <Link className="brand" to="/" aria-label="Alma Nómada, inicio">
          <img src={asset("/images/isotipo-original.png")} alt="" />
          <span>
            <strong>ALMA NÓMADA</strong>
            <small>Viaja libre. Vive a tu manera.</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="navegacion"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="navegacion"
          className={open ? "navigation open" : "navigation"}
          aria-label="Menú principal"
        >
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
          <Link to="/destinos" className="btn nav-cta">
            Explorar destinos
          </Link>
        </nav>
      </header>
    </>
  );
}
