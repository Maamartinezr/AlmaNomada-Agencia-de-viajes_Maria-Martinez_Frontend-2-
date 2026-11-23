import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTravel } from "../context/TravelContext";
import { useRemote } from "../hooks/useRemote";
import { consultar } from "../services/graphqlService";
import { Empty, Heading, RemoteState, Steps } from "../components/common/UI";
import { RoomStepper, SortControl } from "../components/common/OptionControls";
import HotelCard from "../components/hotels/HotelCard";
import { date, endDate, roomRate, sortOptions } from "../utils/travel";
function HotelOptions({ id }) {
  const { trip, selectHotel, update } = useTravel(),
    navigate = useNavigate(),
    [order, setOrder] = useState("precio-asc");
  const state = useRemote(
    (signal) => consultar("hotelesPorDestino", id, signal),
    id,
  );
  const list = sortOptions(
    state.data || [],
    order,
    (h) => roomRate(h, trip) * trip.noches * trip.habitaciones,
  );
  const recommended = Math.ceil(trip.viajeras / 2);
  return (
    <>
      <Steps active={3} />
      <Heading
        eyebrow={`UN LUGAR PARA DESCANSAR · ${trip.destino.nombre}`}
        title="Siéntete en tu lugar"
      >
        Elige el alojamiento y configura tus habitaciones.
      </Heading>
      <div className="stay-bar">
        <p>
          {date(trip.fechaSalida)} al{" "}
          {date(endDate(trip.fechaSalida, trip.noches))}
          <br />
          {trip.viajeras} viajera(s) · {trip.noches} noches
        </p>
        <label>
          Tipo de habitación
          <select
            value={trip.tipoHabitacion}
            onChange={(e) => update({ tipoHabitacion: e.target.value })}
          >
            <option value="doble">Habitación doble</option>
            <option value="suite">Suite Deluxe</option>
          </select>
        </label>
        <RoomStepper
          value={trip.habitaciones}
          onChange={(habitaciones) => update({ habitaciones })}
        />
      </div>
      <div className="option-controls">
        <label>
          Noches de alojamiento
          <select
            value={trip.noches}
            disabled={trip.tipoViaje === "ida-vuelta"}
            onChange={(e) => update({ noches: Number(e.target.value) })}
          >
            {Array.from({ length: 14 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <SortControl value={order} onChange={setOrder} />
        <button
          className="btn btn-outline"
          onClick={() => update({ habitaciones: recommended })}
        >
          Usar recomendación: {recommended} habitación(es)
        </button>
      </div>
      <p className="muted">
        Ambas habitaciones admiten hasta 2 viajeras. En ida y vuelta, las noches
        corresponden a la fecha de regreso seleccionada. Popularidad de
        demostración.
      </p>
      {trip.habitaciones < recommended && (
        <p className="error" role="alert">
          Necesitas al menos {recommended} habitaciones para {trip.viajeras}{" "}
          viajeras.
        </p>
      )}
      <RemoteState state={state}>
        <div className="hotel-list">
          {list.map((h) => (
            <HotelCard
              key={h.id}
              hotel={h}
              trip={trip}
              onSelect={() => {
                selectHotel(h);
                navigate("/mi-viaje/servicios");
              }}
            />
          ))}
        </div>
        {!list.length && (
          <Empty title="Sin alojamientos disponibles">
            Elige otro destino.
          </Empty>
        )}
      </RemoteState>
    </>
  );
}
export default function Hotels() {
  const { destinoId: id } = useParams(),
    { trip } = useTravel();
  return (
    <section className="section page">
      {trip.destino?.id === id && trip.vuelo?.destinoId === id ? (
        <HotelOptions id={id} />
      ) : (
        <Empty
          to={trip.destino?.id === id ? `/vuelos/${id}` : "/destinos"}
          label={
            trip.destino?.id === id ? "Seleccionar vuelo" : "Explorar destinos"
          }
        >
          Elige destino y vuelo antes del hotel.
        </Empty>
      )}
    </section>
  );
}
