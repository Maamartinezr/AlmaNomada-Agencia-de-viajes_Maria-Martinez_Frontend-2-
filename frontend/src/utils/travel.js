import { extrasTotal } from "../data/extras.js";
export const money = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
export const date = (value) =>
  new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value + "T12:00:00Z"));
export function endDate(start, nights) {
  const d = new Date(start + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + Number(nights));
  return d.toISOString().slice(0, 10);
}
export function flightFare(v, trip) {
  const fare = v.tarifas?.find((t) => t.id === trip.clase);
  const luggage = v.equipajes?.find((e) => e.id === trip.equipaje);
  const round = trip.tipoViaje === "ida-vuelta";
  return (
    (fare?.precio ?? v.precio) +
    (round ? (fare?.precioRegreso ?? v.precioRegreso) : 0) +
    (luggage?.precio ?? 0) * (round ? 2 : 1)
  );
}
export function roomRate(h, trip) {
  return (
    h.tiposHabitacion?.find((t) => t.id === trip.tipoHabitacion)
      ?.precioPorNoche ?? h.precioPorNoche
  );
}
export const duration = (start, end) =>
  Math.round((Date.parse(end) - Date.parse(start)) / 86400000);
export function sortOptions(items, order, price) {
  return [...items].sort((a, b) =>
    order === "precio-asc"
      ? price(a) - price(b)
      : order === "precio-desc"
        ? price(b) - price(a)
        : (b.popularidad ?? 0) - (a.popularidad ?? 0),
  );
}
export function timePeriod(time) {
  const hour = Number(time.slice(0, 2));
  return hour >= 6 && hour < 12
    ? "manana"
    : hour >= 12 && hour < 20
      ? "tarde"
      : "noche";
}
export function estimate(trip) {
  if (!trip.vuelo || !trip.hotel) return null;
  return estimateSelection(trip);
}
export function estimateSelection(trip) {
  const { vuelo, hotel, noches, viajeras } = trip;
  if (
    (vuelo && vuelo.moneda !== "CLP") ||
    (hotel && hotel.moneda !== "CLP")
  )
    return null;
  const rooms = trip.habitaciones ?? Math.ceil(viajeras / 2),
    flight = vuelo ? flightFare(vuelo, trip) * viajeras : 0,
    lodging = hotel ? roomRate(hotel, trip) * noches * rooms : 0;
  const extras = extrasTotal(trip.extras, viajeras);
  return { rooms, flight, lodging, extras, total: flight + lodging + extras };
}
export function availableStay(hotel, start, nights) {
  return Array.from({ length: Number(nights) }, (_, i) =>
    endDate(start, i),
  ).every((d) => hotel.fechasDisponibles.includes(d));
}
