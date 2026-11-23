import Icon from "../common/Icon";
import { date, flightFare, money } from "../../utils/travel";
export default function FlightCard({ flight: v, trip, onSelect }) {
  const valid = v.disponible && v.cuposDisponibles >= trip.viajeras;
  const fare = v.tarifas.find((t) => t.id === trip.clase),
    bag = v.equipajes.find((e) => e.id === trip.equipaje);
  return (
    <article className="flight-card">
      <div className="airline">
        <Icon name="plane" />
        <div>
          <h3>{v.aerolinea}</h3>
          <p>Ida: {date(v.fechaSalida)}</p>
          <p>
            {fare.nombre} · {bag.nombre}
          </p>
          <small>{v.escalas}</small>
        </div>
      </div>
      <div>
        <div className="flight-times">
          <div>
            <strong>{v.horaSalida}</strong>
            <span>{v.origen}</span>
          </div>
          <span className="flight-line">
            <Icon name="plane" size={18} />
          </span>
          <div>
            <strong>{v.horaLlegada}</strong>
            <span>{v.destino}</span>
          </div>
        </div>
        {trip.tipoViaje === "ida-vuelta" && (
          <p className="return-flight">
            Vuelta: {date(v.fechaRegreso)}
            <br />
            {v.destino} {v.horaSalidaRegreso} — Santiago {v.horaLlegadaRegreso}
          </p>
        )}
        <p className="muted">Asientos al hacer el Check-In.</p>
      </div>
      <div className="flight-price">
        <strong>{money(flightFare(v, trip))}</strong>
        <small>
          CLP / persona ·{" "}
          {trip.tipoViaje === "ida-vuelta" ? "ida y vuelta" : "solo ida"}
          <br />
          Equipaje seleccionado incluido en el importe
        </small>
        <span className={valid ? "availability" : "unavailable"}>
          {v.disponible
            ? `${v.cuposDisponibles} cupos disponibles`
            : "Sin disponibilidad"}
        </span>
        <button className="btn" disabled={!valid} onClick={onSelect}>
          {valid ? "Seleccionar vuelo" : "Sin cupos suficientes"}
        </button>
      </div>
    </article>
  );
}
