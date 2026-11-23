import { Heading } from "../components/common/UI";
import ExperienceCard from "../components/common/ExperienceCard";
import { experiences } from "../data/experiences";
export default function Experiences() {
  return (
    <section className="section page">
      <Heading eyebrow="NO HAY UNA ÚNICA MANERA" title="¿Qué mueve tu alma?">
        Cinco modalidades, muchas posibilidades. Elige la que conecta contigo
        hoy.
      </Heading>
      <div className="experience-grid full">
        {experiences.map((e) => (
          <ExperienceCard key={e.id} experience={e} detailed />
        ))}
      </div>
      <aside className="notice">
        Estas modalidades son formas de vivir la experiencia, no restricciones
        por edad o estado civil. Puedes elegir más de una forma de viajar.
      </aside>
    </section>
  );
}
