export const initialTrip = {
  destino: null, vuelo: null, hotel: null,
  fechaSalida: '', fechaRegreso: '', noches: 3, viajeras: 1,
  tipoViaje: 'ida-vuelta', clase: 'economica', equipaje: 'bolso',
  tipoHabitacion: 'doble', habitaciones: 1, extras: [], extrasReviewed: false,
};
export function removeTripSelection(trip, kind, id) {
  if (kind === 'destino') return { ...initialTrip, extras: [] };
  if (kind === 'vuelo') return { ...trip, vuelo: null, hotel: null, extras: [], extrasReviewed: false };
  if (kind === 'hotel') return { ...trip, hotel: null, extras: [], extrasReviewed: false };
  if (kind === 'extra') return { ...trip, extras: trip.extras.filter(value => value !== id) };
  if (kind === 'extras') return { ...trip, extras: [], extrasReviewed: true };
  return trip;
}
