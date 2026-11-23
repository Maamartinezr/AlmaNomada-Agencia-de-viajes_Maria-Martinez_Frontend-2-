import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTravel } from "../context/TravelContext";
import { useRemote } from "../hooks/useRemote";
import { consultar } from "../services/graphqlService";
import { Empty, Heading, RemoteState, Steps } from "../components/common/UI";
import { SortControl } from "../components/common/OptionControls";
import FlightCard from "../components/flights/FlightCard";
import { date, flightFare, sortOptions, timePeriod } from "../utils/travel";
function FlightOptions({ id }) {
  const { trip, selectFlight, update } = useTravel(),
    navigate = useNavigate();
  const [order, setOrder] = useState("precio-asc"),
    [period, setPeriod] = useState("");
  const state = useRemote(
    (signal) => consultar("vuelosPorDestino", id, signal),
    id,
  );
  const list = sortOptions(
    (state.data || []).filter(
      (v) =>
        v.fechaSalida === trip.fechaSalida &&
        (!period || timePeriod(v.horaSalida) === period),
    ),
    order,
    (v) => flightFare(v, trip),
  );
  return (
    <>
      <Steps active={2} />
      <Heading
        eyebrow={`TU PRÓXIMA PARADA · ${trip.destino.pais}`}
        title={`Vuela a ${trip.destino.nombre}`}
      >
        Elige fecha, categoría y equipaje. Las tarifas cambian con tu selección.
      </Heading>
      <div className="option-controls">
        <label>
          Fecha de salida
          <select
            value={trip.fechaSalida}
            onChange={(e) => update({ fechaSalida: e.target.value })}
          >
            {trip.destino.fechasDisponibles.map((s) => (
              <option key={s.salida} value={s.salida}>
                {date(s.salida)} · {s.noches} noches
              </option>
            ))}
          </select>
        </label>
        <label>
          Tipo de viaje
          <select
            value={trip.tipoViaje}
            onChange={(e) => update({ tipoViaje: e.target.value })}
          >
            <option value="ida-vuelta">Ida y vuelta</option>
            <option value="solo-ida">Solo ida</option>
          </select>
        </label>
        <label>
          Categoría del vuelo
          <select
            value={trip.clase}
            onChange={(e) => update({ clase: e.target.value })}
          >
            <option value="economica">Económico</option>
            <option value="ejecutiva">Ejecutivo</option>
            <option value="primera">Primera Clase</option>
          </select>
        </label>
        <label>
          Equipaje por persona
          <select
            value={trip.equipaje}
            onChange={(e) => update({ equipaje: e.target.value })}
          >
            <option value="bolso">Bolso de mano</option>
            <option value="cabina">Bolso + Carry-on (10 kg)</option>
            <option value="facturada">
              Bolso + Carry-on (10 kg) + Maleta facturada (23 kg)
            </option>
          </select>
        </label>
        <label>
          Cantidad de viajeras
          <select
            value={trip.viajeras}
            onChange={(e) => update({ viajeras: Number(e.target.value) })}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label>
          Horario de salida
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="">Todos los horarios</option>
            <option value="manana">Matutinos · 06:00 a 11:59</option>
            <option value="tarde">Vespertinos · 12:00 a 19:59</option>
            <option value="noche">Nocturnos · 20:00 a 05:59</option>
          </select>
        </label>
        <SortControl value={order} onChange={setOrder} />
      </div>
      <p className="muted">
        Itinerarios, categorías, precios y popularidad de demostración. Los
        nombres de aerolíneas son referenciales y no acreditan rutas, horarios
        ni servicios reales. Asientos elegidos al hacer el Check-In.
      </p>
      <RemoteState state={state}>
        <p>{list.length} opciones para esta salida</p>
        <div className="flight-list">
          {list.map((v) => (
            <FlightCard
              key={v.id}
              flight={v}
              trip={trip}
              onSelect={() => {
                selectFlight(v);
                navigate(`/hoteles/${id}`);
              }}
            />
          ))}
        </div>
        {!list.length && (
          <div className="state">
            <h2>No hay vuelos con este horario</h2>
            <button className="btn" onClick={() => setPeriod("")}>
              Ver todos los horarios
            </button>
          </div>
        )}
      </RemoteState>
    </>
  );
}
export default function Flights() {
  const { destinoId: id } = useParams(),
    { trip } = useTravel();
  return (
    <section className="section page">
      {trip.destino?.id === id ? (
        <FlightOptions id={id} />
      ) : (
        <Empty>Primero elige un destino y una salida.</Empty>
      )}
    </section>
  );
}
