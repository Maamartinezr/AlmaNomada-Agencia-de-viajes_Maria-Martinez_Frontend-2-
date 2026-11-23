import { Link } from "react-router-dom";
import { useRemote } from "../hooks/useRemote";
import { listarDestinos } from "../services/destinosService";
import { experiences } from "../data/experiences";
import { Photo, RemoteState } from "../components/common/UI";
import ExperienceCard from "../components/common/ExperienceCard";
import DestinationCard from "../components/destinations/DestinationCard";
import Icon from "../components/common/Icon";
export default function Home() {
  const state = useRemote(listarDestinos);
  return (
    <>
      <section className="hero">
        <Photo
          src="/images/santorini.jpg"
          alt="Pueblos blancos y mar azul del Mediterráneo"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light">
            VIAJES PARA MUJERES · HISTORIAS PARA TI
          </span>
          <h1>
            Descubre el mundo
            <br />a tu <em>manera.</em>
          </h1>
          <p>
            Experiencias únicas para viajar sola, con amigas
            <br className="desktop" /> o encontrar nuevas compañeras de
            aventura.
          </p>
          <Link to="/destinos" className="btn">
            Explorar destinos <Icon name="compass" size={19} />
          </Link>
        </div>
        <div className="hero-bottom">
          <span>
            <Icon name="shield" />
            Confianza en cada paso
          </span>
          <span>
            <Icon name="users" />
            Conexiones que inspiran
          </span>
          <span>
            <Icon name="leaf" />
            Experiencias con sentido
          </span>
        </div>
        <div className="hero-location">
          <Icon name="pin" size={16} /> Un respiro en el Mediterráneo
        </div>
      </section>
      <section className="intro strip">
        <span className="eyebrow">TU PRÓXIMO CAPÍTULO EMPIEZA AQUÍ</span>
        <p>
          No hay una sola forma de viajar.
          <br />
          <span>Hay una que se parece a ti.</span>
        </p>
        <span className="handwritten">Encuentra la tuya</span>
      </section>
      <section className="section">
        <div className="section-top">
          <div>
            <span className="eyebrow">CINCO FORMAS DE VIVIR EL MUNDO</span>
            <h2>Una experiencia para cada alma</h2>
          </div>
          <Link className="text-link" to="/experiencias">
            Conoce nuestras experiencias <Icon name="compass" size={18} />
          </Link>
        </div>
        <div className="experience-grid">
          {experiences.map((e) => (
            <ExperienceCard key={e.id} experience={e} />
          ))}
        </div>
      </section>
      <section className="section featured">
        <div className="section-top">
          <div>
            <span className="eyebrow">LUGARES QUE DEJAN HUELLA</span>
            <h2>Tu próxima gran historia</h2>
            <p>
              De cerca o al otro lado del mundo. Empieza por lo que te mueve.
            </p>
          </div>
          <Link to="/destinos" className="btn btn-outline">
            Ver todos los destinos
          </Link>
        </div>
        <RemoteState state={state}>
          <div className="destination-grid">
            {state.data
              ?.filter((d) => ["atacama", "santorini", "bali"].includes(d.id))
              .map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
          </div>
        </RemoteState>
      </section>
      <section className="section planning">
        <div>
          <span className="eyebrow">MENOS VUELTAS. MÁS MUNDO.</span>
          <h2>
            Imagina tu viaje.
            <br />
            Dale forma, paso a paso.
          </h2>
          <p>
            Elige lo que va contigo y reúne tu próxima aventura en un solo
            lugar.
          </p>
          <Link to="/destinos" className="btn">
            Comenzar mi viaje
          </Link>
        </div>
        <div className="planning-list">
          {[
            [
              "pin",
              "Elige tu destino",
              "Un lugar que despierte tu curiosidad.",
            ],
            [
              "plane",
              "Encuentra tu vuelo",
              "Consulta fechas, precios y disponibilidad.",
            ],
            [
              "hotel",
              "Tu lugar para descansar",
              "Elige un alojamiento a tu medida.",
            ],
            [
              "leaf",
              "Personaliza tu experiencia",
              "Agrega servicios opcionales o continúa sin ellos.",
            ],
            [
              "heart",
              "Todo listo para imaginarlo",
              "Revisa el resumen y el costo estimado.",
            ],
          ].map(([icon, title, text]) => (
            <div key={icon}>
              <span className="round-icon">
                <Icon name={icon} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="closing">
        <Photo
          src="/images/atacama.jpg"
          alt="Paisaje de montañas para inspirar tu próxima aventura"
        />
        <div>
          <span className="eyebrow light">EL MUNDO TE ESTÁ ESPERANDO</span>
          <h2>
            Más que viajes,
            <br />
            <em>historias que son tuyas.</em>
          </h2>
          <Link to="/destinos" className="btn">
            Encuentra tu próxima aventura
          </Link>
        </div>
      </section>
    </>
  );
}
