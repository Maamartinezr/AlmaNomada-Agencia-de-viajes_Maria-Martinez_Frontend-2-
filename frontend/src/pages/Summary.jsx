import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { consultar } from '../services/graphqlService';
import { useRemote } from '../hooks/useRemote';
import { availableStay, estimateSelection, money } from '../utils/travel';
import { Empty, Heading, RemoteState, Steps, FutureButton } from '../components/common/UI';
import TravelSummary from '../components/common/TravelSummary';
import ContactForm from '../components/common/ContactForm';
import ReservationDialog from '../components/common/ReservationDialog';
import { RoomStepper } from '../components/common/OptionControls';

function SelectionSummary({ onRemove }) {
  const { trip, update } = useTravel();
  const [reserve, setReserve] = useState(false);
  const state = useRemote(async signal => {
    const [flights, hotels] = await Promise.all([
      trip.vuelo ? consultar('vuelosPorDestino',trip.destino.id,signal) : Promise.resolve([]),
      trip.hotel ? consultar('hotelesPorDestino',trip.destino.id,signal) : Promise.resolve([]),
    ]);
    return { vuelo: flights.find(v => v.id === trip.vuelo?.id), hotel: hotels.find(h => h.id === trip.hotel?.id) };
  }, `${trip.destino.id}|${trip.vuelo?.id ?? ''}|${trip.hotel?.id ?? ''}`);
  const live = state.data;
  const current = { ...trip,
    vuelo: trip.vuelo ? (live?.vuelo?.id === trip.vuelo.id ? live.vuelo : trip.vuelo) : null,
    hotel: trip.hotel ? (live?.hotel?.id === trip.hotel.id ? live.hotel : trip.hotel) : null,
  };
  const cost = estimateSelection(current);
  const complete = trip.vuelo && trip.hotel;
  const valid = !state.loading && complete && live?.vuelo?.id === trip.vuelo.id && live?.hotel?.id === trip.hotel.id &&
    live.vuelo.disponible && live.vuelo.cuposDisponibles >= trip.viajeras && live.vuelo.fechaSalida === trip.fechaSalida &&
    live.hotel.disponible && live.hotel.habitacionesDisponibles >= trip.habitaciones &&
    availableStay(live.hotel,trip.fechaSalida,trip.noches) && cost && trip.habitaciones * 2 >= trip.viajeras;
  const nextTo = !trip.vuelo ? `/vuelos/${trip.destino.id}` : !trip.hotel ? `/hoteles/${trip.destino.id}` : '/mi-viaje/servicios';
  const nextLabel = !trip.vuelo ? 'Seleccionar vuelo' : !trip.hotel ? 'Seleccionar hotel' : 'Revisar servicios opcionales';
  return <>
    <Steps active={!trip.vuelo ? 2 : !trip.hotel ? 3 : !trip.extrasReviewed ? 4 : 5}/>
    <Heading eyebrow="TU PRÓXIMA HISTORIA" title="Un viaje que se parece a ti">Revisa tu selección y sus importes estimados.</Heading>
    <RemoteState state={state}>
      {(!complete || !trip.extrasReviewed) && <div className="summary-pending"><p>{!complete ? 'Tu viaje tiene pasos pendientes. Conservamos los elementos que siguen seleccionados.' : 'Revisa los servicios opcionales o continúa sin agregarlos antes de solicitar tu reserva.'}</p><Link className="btn" to={nextTo}>{nextLabel}</Link></div>}
      {complete && !valid && <p className="error" role="alert">Revisa las fechas, la disponibilidad, los cupos y la capacidad de las habitaciones antes de reservar.</p>}
      <div className="summary-grid">
        <TravelSummary trip={current} cost={cost} onRemove={(kind,id) => { setReserve(false); onRemove(kind,id); }}/>
        <aside className="cost-card">
          <span className="eyebrow">TU ESTIMACIÓN</span>
          {trip.vuelo && <label>Cantidad de viajeras<select value={trip.viajeras} onChange={e => update({viajeras:Number(e.target.value)})}>
            {Array.from({length:Math.min(8,current.vuelo.cuposDisponibles)},(_,i)=><option key={i} value={i+1}>{i+1}</option>)}
          </select></label>}
          {trip.hotel && <>
            <label>Tipo de habitación<select value={trip.tipoHabitacion} onChange={e=>update({tipoHabitacion:e.target.value})}><option value="doble">Habitación doble</option><option value="suite">Suite Deluxe</option></select></label>
            <RoomStepper value={trip.habitaciones} onChange={habitaciones=>update({habitaciones})}/>
          </>}
          {cost ? <dl>
            <div><dt>Vuelos × {trip.viajeras}</dt><dd>{money(cost.flight)}</dd></div>
            <div><dt>Alojamiento × {trip.hotel ? cost.rooms : 0} hab.</dt><dd>{money(cost.lodging)}</dd></div>
            <div><dt>Servicios adicionales</dt><dd>{money(cost.extras)}</dd></div>
            <div className="total"><dt>{complete ? 'Total estimado' : 'Subtotal seleccionado'}</dt><dd>{money(cost.total)}<small>CLP</small></dd></div>
          </dl> : <p role="alert">No se pueden combinar importes de monedas distintas.</p>}
          {trip.hotel && <Link className="text-link" to="/mi-viaje/servicios">Agregar servicios adicionales</Link>}
          <p>Importes de demostración. Los elementos eliminados no se incluyen en el total.</p>
          <button className="btn" disabled={!valid || !trip.extrasReviewed} onClick={()=>setReserve(true)}>Solicitar reserva</button>
          <FutureButton>Ir al pago</FutureButton>
          <p className="muted">Reserva de demostración. Sin cobro ni confirmación comercial.</p>
        </aside>
      </div>
      {reserve && valid && <ReservationDialog onClose={()=>setReserve(false)}>
        <p>Revisa tus datos para confirmar una solicitud simulada.</p>
        <ContactForm reservation travelers={trip.viajeras} maxTravelers={live.vuelo.cuposDisponibles} onTravelersChange={viajeras=>update({viajeras})}/>
      </ReservationDialog>}
    </RemoteState>
  </>;
}
export default function Summary() {
  const { trip, remove } = useTravel();
  const [message,setMessage] = useState('');
  function removeItem(kind,id) {
    remove(kind,id);
    setMessage({destino:'Se eliminó el destino y se vació la planificación del viaje.',vuelo:'Se eliminaron el vuelo, el hotel y los servicios asociados. El subtotal se actualizó.',hotel:'Se eliminaron el hotel y los servicios asociados. Conservamos tu destino y vuelo.',extra:'Servicio eliminado. El total se actualizó.',extras:'Se eliminaron todos los servicios adicionales. El total se actualizó.'}[kind]);
  }
  return <section className="section page">
    {message && <p className="services-confirmation" role="status">{message}</p>}
    {trip.destino ? <SelectionSummary onRemove={removeItem}/> : <Empty to="/destinos" label="Elegir destino">No tienes un viaje seleccionado. Elige un destino para comenzar.</Empty>}
  </section>;
}
