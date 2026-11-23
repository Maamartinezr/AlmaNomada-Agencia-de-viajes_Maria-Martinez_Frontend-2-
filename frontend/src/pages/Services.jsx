import { Link } from 'react-router-dom';
import { Heading } from '../components/common/UI';
import ExtraServices from '../components/common/ExtraServices';
export default function Services() {
  return <section className="section page">
    <Heading eyebrow="DALE TU TOQUE AL VIAJE" title="Servicios adicionales">
      Conoce nuestras opciones de transporte, movilidad y paseos.
    </Heading>
    <p className="services-guide">Puedes elegir estos servicios después de seleccionar tu hotel, durante la planificación de tu viaje. Todos son opcionales.</p>
    <ExtraServices readOnly />
    <Link className="btn" to="/destinos">Comenzar a planificar mi viaje</Link>
  </section>;
}
