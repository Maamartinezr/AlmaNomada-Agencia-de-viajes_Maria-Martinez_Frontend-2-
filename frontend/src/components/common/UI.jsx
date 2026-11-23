import { Link } from "react-router-dom";
import Icon from "./Icon";
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
export function Photo({ src, alt, ...props }) {
  return <img src={asset(src)} alt={alt} loading="lazy" {...props} />;
}
export function Heading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
export function RemoteState({ state, children }) {
  if (state.loading)
    return (
      <div className="state" role="status">
        <span className="spinner" />
        <span>Preparando tu próxima aventura…</span>
      </div>
    );
  if (state.error)
    return (
      <div className="state error" role="alert">
        <h2>No pudimos cargar las opciones</h2>
        <p>{state.error}</p>
        <button className="btn" onClick={state.retry}>
          Volver a intentar
        </button>
      </div>
    );
  return children;
}
export function Empty({
  title = "Todavía hay un paso pendiente",
  children,
  to = "/destinos",
  label = "Explorar destinos",
}) {
  return (
    <div className="state">
      <Icon name="compass" size={40} />
      <h1>{title}</h1>
      <p>{children}</p>
      <Link className="btn" to={to}>
        {label}
      </Link>
    </div>
  );
}
export function Steps({ active = 1 }) {
  return (
    <ol className="steps" aria-label="Etapas de planificación">
      {["Destino", "Vuelo", "Hotel", "Servicios", "Tu viaje"].map((s, i) => (
        <li
          key={s}
          className={i + 1 <= active ? "current" : ""}
          aria-current={i + 1 === active ? "step" : undefined}
        >
          <span>
            {i + 1 < active ? <Icon name="check" size={15} /> : i + 1}
          </span>
          {s}
        </li>
      ))}
    </ol>
  );
}
export function FutureButton({ children }) {
  return (
    <span className="future">
      <button
        type="button"
        className="btn btn-outline"
        aria-disabled="true"
        title="En proceso · Estamos trabajando en esta función"
      >
        {children}
      </button>
      <span role="tooltip">En proceso · Estamos trabajando en ello</span>
    </span>
  );
}
