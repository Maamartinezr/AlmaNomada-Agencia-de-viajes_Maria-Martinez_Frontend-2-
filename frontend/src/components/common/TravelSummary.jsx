import { Link } from 'react-router-dom';
import { date, endDate, money } from '../../utils/travel';
import { extrasCatalog } from '../../data/extras';
export default function TravelSummary({ trip, cost, onRemove }) {
  const fare = trip.vuelo?.tarifas.find(t => t.id === trip.clase);
  const bag = trip.vuelo?.equipajes.find(e => e.id === trip.equipaje);
  const room = trip.hotel?.tiposHabitacion.find(t => t.id === trip.tipoHabitacion);
  const actions = (kind, to, label) => <div className="summary-actions">
    <Link to={to}>Modificar {label}</Link>
    <button type="button" className="remove-selection" onClick={() => onRemove(kind)}>Eliminar {label}</button>
  </div>;
  return <div className="summary-content">
    <h2>Tu itinerario, a tu manera</h2>
    <div className="summary-line">
      <div><span className="eyebrow">DESTINO</span><h3>{trip.destino.nombre}, {trip.destino.pais}</h3></div>
      {actions('destino', '/destinos', 'destino')}
    </div>
    <div className="summary-line">
      <div><span className="eyebrow">TU VUELO</span>
        {trip.vuelo ? <>
          <h3>{trip.vuelo.aerolinea}</h3><p>{trip.vuelo.origen} — {trip.vuelo.destino}</p>
          <p>Ida: {date(trip.vuelo.fechaSalida)} · {trip.vuelo.horaSalida} a {trip.vuelo.horaLlegada}</p>
          {trip.tipoViaje === 'ida-vuelta' ? <p>Vuelta: {date(trip.vuelo.fechaRegreso)} · {trip.vuelo.horaSalidaRegreso} a {trip.vuelo.horaLlegadaRegreso}</p> : <p>Solo ida · sin vuelo de regreso</p>}
          <p>{fare?.nombre}<br/>{bag?.nombre}<br/>Asientos elegidos al hacer el Check-In.</p>
          <p className="muted">Al eliminar el vuelo también se quitarán el hotel y los servicios asociados.</p>
        </> : <p>Sin vuelo seleccionado.</p>}
      </div>
      {trip.vuelo ? actions('vuelo', `/vuelos/${trip.destino.id}`, 'vuelo') : <Link to={`/vuelos/${trip.destino.id}`}>Seleccionar vuelo</Link>}
    </div>
    <div className="summary-line">
      <div><span className="eyebrow">TU ESTANCIA</span>
        {trip.hotel ? <>
          <h3>{trip.hotel.nombre}</h3><p>{room?.nombre} · hasta {room?.capacidad} viajeras por habitación</p>
          <p>{date(trip.fechaSalida)} al {date(endDate(trip.fechaSalida, trip.noches))}</p>
          <p>{trip.noches} noches · {cost?.rooms ?? trip.habitaciones} habitación(es) · {trip.viajeras} viajera(s)</p>
          <p>{money(room?.precioPorNoche)} CLP / habitación / noche</p>
          <p className="muted">Al eliminar el hotel también se quitarán los servicios asociados.</p>
        </> : <p>Sin hotel seleccionado.</p>}
      </div>
      {trip.hotel ? actions('hotel', `/hoteles/${trip.destino.id}`, 'hotel') : trip.vuelo && <Link to={`/hoteles/${trip.destino.id}`}>Seleccionar hotel</Link>}
    </div>
    <div className="summary-line">
      <div><span className="eyebrow">SERVICIOS ADICIONALES</span>
        {trip.extras.length ? <ul className="summary-services">
          {extrasCatalog.filter(e => trip.extras.includes(e.id)).map(e => <li key={e.id}>
            <span>{e.nombre} · {e.grupo === 'actividad' ? `${trip.viajeras} viajera(s)` : e.grupo === 'alquiler' ? '1 vehículo × 1 día' : '1 vehículo, ida y vuelta'}</span>
            <button type="button" className="remove-selection" aria-label={`Eliminar servicio ${e.nombre}`} onClick={() => onRemove('extra',e.id)}>Eliminar</button>
          </li>)}
        </ul> : <p>Sin servicios adicionales seleccionados.</p>}
      </div>
      <div className="summary-actions">
        {trip.hotel && <Link to="/mi-viaje/servicios">{trip.extras.length ? 'Modificar servicios' : 'Elegir servicios opcionales'}</Link>}
        {!!trip.extras.length && <button className="remove-selection" onClick={() => onRemove('extras')}>Eliminar todos los servicios</button>}
      </div>
    </div>
  </div>;
}
