const text = (x) => typeof x === "string" && x.trim().length > 0;
const strings = (x) => Array.isArray(x) && x.every(text);
export const validDestination = (d) =>
  d &&
  ["id", "nombre", "pais", "ciudad", "descripcion", "imagen"].every((k) =>
    text(d[k]),
  ) &&
  strings(d.actividadesPopulares) &&
  strings(d.categoriasAlma) &&
  Array.isArray(d.fechasDisponibles) &&
  d.fechasDisponibles.length > 0 &&
  d.fechasDisponibles.every(
    (s) =>
      text(s.salida) &&
      text(s.regreso) &&
      Number.isInteger(s.noches) &&
      s.noches >= 1,
  );
export const validOption = (x, type, id) => {
  if (
    !x ||
    !text(x.id) ||
    x.destinoId !== id ||
    x.moneda !== "CLP" ||
    typeof x.disponible !== "boolean"
  )
    return false;
  if (type === "vuelosPorDestino")
    return (
      [
        "aerolinea",
        "origen",
        "destino",
        "fechaSalida",
        "horaSalida",
        "horaLlegada",
      ].every((k) => text(x[k])) &&
      /^\d{4}-\d{2}-\d{2}$/.test(x.fechaSalida) &&
      Number.isFinite(x.precio) &&
      x.precio >= 0 &&
      Number.isInteger(x.cuposDisponibles) &&
      x.cuposDisponibles >= 0 &&
      text(x.fechaRegreso) &&
      Number.isFinite(x.precioRegreso) &&
      Number.isFinite(x.popularidad) &&
      Array.isArray(x.tarifas) &&
      x.tarifas.length === 3 &&
      x.tarifas.every(
        (t) =>
          text(t.id) &&
          text(t.nombre) &&
          Number.isFinite(t.precio) &&
          Number.isFinite(t.precioRegreso),
      ) &&
      Array.isArray(x.equipajes) &&
      x.equipajes.length === 3 &&
      x.equipajes.every((e) => text(e.id) && Number.isFinite(e.precio))
    );
  return (
    ["nombre", "ciudad", "imagen"].every((k) => text(x[k])) &&
    Number.isFinite(x.precioPorNoche) &&
    x.precioPorNoche >= 0 &&
    Number.isInteger(x.categoria) &&
    strings(x.servicios) &&
    strings(x.fechasDisponibles) &&
    Number.isFinite(x.popularidad) &&
    Number.isInteger(x.habitacionesDisponibles) &&
    Array.isArray(x.tiposHabitacion) &&
    x.tiposHabitacion.length === 2 &&
    x.tiposHabitacion.every(
      (t) =>
        text(t.id) &&
        Number.isFinite(t.precioPorNoche) &&
        Number.isInteger(t.capacidad),
    )
  );
};
