import { createContext, useContext, useEffect, useState } from "react";
import { extrasCatalog } from "../data/extras";
import { initialTrip, removeTripSelection } from "../utils/tripSelection";
const TravelContext = createContext();
const empty = initialTrip;
function restore() {
  try {
    const value = JSON.parse(sessionStorage.getItem("alma-travel-v2"));
    return value &&
      Number.isInteger(value.viajeras) &&
      value.viajeras >= 1 &&
      value.viajeras <= 8 &&
      Number.isInteger(value.habitaciones) &&
      value.habitaciones >= 1 &&
      value.habitaciones <= 25 &&
      Array.isArray(value.extras)
      ? { ...empty, ...value }
      : empty;
  } catch {
    return empty;
  }
}
export function TravelProvider({ children }) {
  const [trip, setTrip] = useState(restore);
  useEffect(() => {
    try {
      sessionStorage.setItem("alma-travel-v2", JSON.stringify(trip));
    } catch {}
  }, [trip]);
  function selectDestination(destino, schedule = destino.fechasDisponibles[0]) {
    setTrip((old) =>
      old.destino?.id === destino.id && old.fechaSalida === schedule.salida
        ? { ...old, destino }
        : {
            ...empty,
            destino,
            fechaSalida: schedule.salida,
            fechaRegreso: schedule.regreso,
            noches: schedule.noches,
          },
    );
  }
  function update(values) {
    setTrip((old) => {
      let next = { ...old, ...values };
      if (values.fechaSalida && values.fechaSalida !== old.fechaSalida) {
        const schedule = old.destino.fechasDisponibles.find(
          (s) => s.salida === values.fechaSalida,
        );
        next = {
          ...next,
          fechaRegreso: schedule.regreso,
          noches: schedule.noches,
          vuelo: null,
          hotel: null,
          extras: [], extrasReviewed: false,
        };
      }
      if (
        ["tipoViaje", "clase", "equipaje"].some(
          (key) => values[key] !== undefined && values[key] !== old[key],
        )
      )
        next = { ...next, vuelo: null, hotel: null, extras: [], extrasReviewed: false };
      if (values.viajeras) {
        next.habitaciones = Math.max(
          old.habitaciones,
          Math.ceil(values.viajeras / 2),
        );
        next.extras = old.extras.filter((id) => {
          const item = extrasCatalog.find((e) => e.id === id);
          return item && (!item.capacidad || item.capacidad >= values.viajeras);
        });
      }
      return next;
    });
  }
  const selectFlight = (vuelo) =>
    setTrip((old) => ({ ...old, vuelo, hotel: null, extras: [], extrasReviewed: false }));
  const selectHotel = (hotel) => setTrip((old) => ({ ...old, hotel, extrasReviewed: false }));
  return (
    <TravelContext.Provider
      value={{
        trip,
        selectDestination,
        selectFlight,
        selectHotel,
        update,
        remove: (kind, id) => setTrip(old => removeTripSelection(old, kind, id)),
        reset: () => setTrip({ ...empty }),
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}
export const useTravel = () => useContext(TravelContext);
