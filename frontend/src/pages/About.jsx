import { Link } from "react-router-dom";
import { Heading, Photo, FutureButton } from "../components/common/UI";
import Icon from "../components/common/Icon";
export default function About() {
  return (
    <section className="section page">
      <Heading eyebrow="SOMOS ALMA NÓMADA" title="El viaje empieza contigo">
        Creemos en la libertad de explorar el mundo a tu manera.
      </Heading>
      <div className="about-grid">
        <Photo src="/images/bali.jpg" alt="Naturaleza y arquitectura en Bali" />
        <div>
          <span className="handwritten">Un camino, muchos destinos.</span>
          <h2>
            Más que una agencia,
            <br />
            una forma de mirar el mundo.
          </h2>
          <p>
            Alma Nómada nace como un proyecto de agencia para mujeres que
            quieren descubrir destinos y nuevas versiones de sí mismas. Solas,
            con amigas o con nuevas compañeras de aventura.
          </p>
          <p>
            Diseñamos experiencias con espacio para la independencia, la
            comodidad y los encuentros. Cada etapa de la vida tiene su propio
            ritmo; cada viajera, su propio camino.
          </p>
          <Link className="btn" to="/experiencias">
            Encuentra tu experiencia
          </Link>
        </div>
      </div>
      <div className="value-grid">
        {[
          [
            "shield",
            "Confianza",
            "Información clara para elegir con tranquilidad.",
          ],
          [
            "users",
            "Comunidad",
            "Conexiones entre mujeres, historias compartidas.",
          ],
          [
            "leaf",
            "Viajes con sentido",
            "Respeto por los lugares y sus comunidades.",
          ],
        ].map(([icon, title, text]) => (
          <article key={icon}>
            <Icon name={icon} size={32} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <aside className="notice">
        <p>
          Proyecto académico de agencia simulada. Los servicios, disponibilidad
          y solicitudes no corresponden a una oferta comercial real.
        </p>
      </aside>
      <div className="future-area">
        <h2>Próximamente, un espacio para ti</h2>
        <p>
          Estamos preparando perfiles de viajeras y nuevas herramientas para
          acompañar tus planes.
        </p>
        <FutureButton>Mi perfil</FutureButton>
      </div>
    </section>
  );
}
