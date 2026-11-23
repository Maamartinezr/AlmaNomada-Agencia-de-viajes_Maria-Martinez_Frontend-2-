import { Link } from "react-router-dom";
import { Photo } from "../common/UI";
import Icon from "../common/Icon";
import { experiences } from "../../data/experiences";
import DepartureDates from "./DepartureDates";
export default function DestinationCard({ destination: d }) {
  return (
    <article className="destination-card">
      <Link to={`/destinos/${d.id}`} className="card-photo">
        <Photo src={d.imagen} alt={`Paisaje ilustrativo para ${d.nombre}`} />
        <span className="photo-label">
          <Icon name="pin" size={14} />
          {d.pais}
        </span>
      </Link>
      <div className="card-content">
        <span className="eyebrow">{d.pais}</span>
        <h3>
          <Link to={`/destinos/${d.id}`}>{d.nombre}</Link>
        </h3>
        <p>{d.descripcion}</p>
        <div className="tags">
          {d.categoriasAlma.map((c) => (
            <span key={c}>{experiences.find((e) => e.id === c)?.name}</span>
          ))}
        </div>
        <ul className="activities">
          {d.actividadesPopulares.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <DepartureDates destination={d} />
        <Link className="text-link" to={`/destinos/${d.id}`}>
          Explorar {d.nombre} <Icon name="compass" size={17} />
        </Link>
      </div>
    </article>
  );
}
