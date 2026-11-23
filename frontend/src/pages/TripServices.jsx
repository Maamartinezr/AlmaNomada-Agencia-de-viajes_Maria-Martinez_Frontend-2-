import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Empty, Heading, Steps } from '../components/common/UI';
import ExtraServices from '../components/common/ExtraServices';
import { useTravel } from '../context/TravelContext';
import { extrasTotal } from '../data/extras';
import { money } from '../utils/travel';

function ServiceSelection() {
  const { trip, update } = useTravel();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState(() => [...trip.extras]);
  function finish(ids) {
    update({ extras: [...ids], extrasReviewed: true });
    navigate('/resumen');
  }
  return <>
    <Steps active={4} />
    <Heading eyebrow={`PERSONALIZA TU VIAJE · ${trip.destino.nombre}`} title="¿Le damos un toque extra?">
      Elige servicios para tu viaje o continúa directamente al resumen.
    </Heading>
    <div className="optional-services">
      <div><h2>Este paso es opcional</h2><p>Puedes viajar sin agregar servicios. Si ya habías elegido alguno, este botón lo quitará del viaje.</p></div>
      <button className="btn btn-skip-services" onClick={() => finish([])}>Continuar sin servicios adicionales</button>
    </div>
    <ExtraServices selectedIds={selectedIds} onChange={setSelectedIds} travelers={trip.viajeras} />
    <div className="services-total">
      <p>Total adicional estimado: <strong>{money(extrasTotal(selectedIds, trip.viajeras))} CLP</strong>
        <span className="services-count">{selectedIds.length} servicio(s) seleccionado(s)</span>
      </p>
      <button className="btn" disabled={!selectedIds.length} onClick={() => finish(selectedIds)}>Agregar servicios y ver resumen</button>
    </div>
  </>;
}
export default function TripServices() {
  const { trip } = useTravel();
  const ready = trip.destino && trip.vuelo?.destinoId === trip.destino.id && trip.hotel?.destinoId === trip.destino.id;
  return <section className="section page">{ready ? <ServiceSelection /> :
    <Empty to={!trip.destino ? '/destinos' : !trip.vuelo ? `/vuelos/${trip.destino.id}` : `/hoteles/${trip.destino.id}`}
      label={!trip.destino ? 'Elegir destino' : !trip.vuelo ? 'Seleccionar vuelo' : 'Seleccionar hotel'}>
      Elige destino, vuelo y hotel antes de personalizar los servicios de tu viaje.
    </Empty>}
  </section>;
}
