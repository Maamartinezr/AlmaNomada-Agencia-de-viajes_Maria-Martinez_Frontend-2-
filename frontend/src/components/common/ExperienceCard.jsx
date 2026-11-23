import { Link } from "react-router-dom";
import { Photo } from "./UI";
import Icon from "./Icon";
export default function ExperienceCard({ experience: e, detailed = false }) {
  return (
    <article className="experience-card">
      <div className="experience-image">
        <Photo src={e.image} alt={`Inspiración ${e.name}`} />
        <span className="round-icon">
          <Icon name={e.icon} />
        </span>
      </div>
      <div className="experience-copy">
        <span className="eyebrow">{e.name}</span>
        <h3>{e.title}</h3>
        {detailed ? <>
          <p className="experience-audience"><strong>Para:</strong> {e.audience}</p>
          <ul className="experience-benefits">{e.benefits.map(text => <li key={text}>{text}</li>)}</ul>
        </> : <p>{e.description}</p>}
        <Link to={detailed ? `/destinos?alma=${e.id}` : `/experiencias/${e.id}`}>
          {detailed ? `Ver destinos ${e.name}` : `Explorar ${e.name}`}
        </Link>
      </div>
    </article>
  );
}
