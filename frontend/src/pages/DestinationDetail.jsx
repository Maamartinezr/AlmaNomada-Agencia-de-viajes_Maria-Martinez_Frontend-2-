import { useNavigate, useParams } from "react-router-dom";
import { request } from "../services/http";
import { validDestination } from "../services/validation";
import { useRemote } from "../hooks/useRemote";
import { useTravel } from "../context/TravelContext";
import { Photo, RemoteState, Steps } from "../components/common/UI";
import { experiences } from "../data/experiences";
import Icon from "../components/common/Icon";
import DepartureDates from "../components/destinations/DepartureDates";
export default function DestinationDetail() {
  const { id } = useParams(),
    navigate = useNavigate();
  const { selectDestination } = useTravel();
  const state = useRemote(
    (signal) =>
      request(`/api/destinos/${encodeURIComponent(id)}`, { signal }).then(
        (d) => {
          if (!validDestination(d))
            throw new Error("El destino contiene datos incompletos.");
          return d;
        },
      ),
    id,
  );
  const d = state.data;
  return (
    <section className="section page">
      <Steps />
      <RemoteState state={state}>
        {d && (
          <>
            <div className="detail-grid">
              <Photo
                className="detail-photo"
                src={d.imagen}
                alt={`Ambientación de viaje: ${d.nombre}`}
              />
              <div className="detail-copy">
                <span className="eyebrow">
                  {d.pais} · {d.ciudad}
                </span>
                <h1>{d.nombre}</h1>
                <p className="lead">{d.descripcion}</p>
                <h2>Momentos que te esperan</h2>
                <ul className="activity-list">
                  {d.actividadesPopulares.map((a) => (
                    <li key={a}>
                      <Icon name="check" size={18} />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="tags">
                  {d.categoriasAlma.map((c) => (
                    <span key={c}>
                      {experiences.find((e) => e.id === c)?.name}
                    </span>
                  ))}
                </div>
                <DepartureDates destination={d} />
                <button
                  className="btn"
                  onClick={() => {
                    selectDestination(d);
                    navigate(`/vuelos/${d.id}`);
                  }}
                >
                  Elegir destino y ver vuelos
                </button>
              </div>
            </div>
            <aside className="notice">
              <Icon name="shield" />
              <p>
                Tu ritmo importa. Las modalidades orientan la experiencia y
                están abiertas a mujeres de distintas edades. Cusco y Atacama
                incluyen altura y caminatas; Santorini y Roma pueden incluir
                escaleras. Revisa movilidad y condiciones antes de un viaje
                real.
              </p>
            </aside>
          </>
        )}
      </RemoteState>
    </section>
  );
}
