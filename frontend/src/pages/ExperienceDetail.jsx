import { Link, useParams } from 'react-router-dom';
import { Heading, Empty } from '../components/common/UI';
import ExperienceCard from '../components/common/ExperienceCard';
import { experiences } from '../data/experiences';

export default function ExperienceDetail() {
  const { id } = useParams();
  const experience = experiences.find(item => item.id === id);
  if (!experience) return <section className="section page"><Empty title="No encontramos esta experiencia" to="/experiencias" label="Ver todas las experiencias">Elige una de nuestras cinco formas de viajar.</Empty></section>;
  return <section className="section page">
    <Heading eyebrow="TU FORMA DE VIVIR EL MUNDO" title={experience.name}>{experience.description}</Heading>
    <div className="experience-detail"><ExperienceCard experience={experience} detailed /></div>
    <Link className="text-link" to="/experiencias">Ver todas las experiencias</Link>
  </section>;
}
