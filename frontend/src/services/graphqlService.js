import { request } from "./http";
import { validOption } from "./validation";
const fields = {
  vuelosPorDestino:
    "id destinoId aerolinea origen destino fechaSalida fechaRegreso horaSalida horaLlegada horaSalidaRegreso horaLlegadaRegreso precio precioRegreso moneda disponible cuposDisponibles popularidad escalas tarifas {id nombre precio precioRegreso} equipajes {id nombre precio}",
  hotelesPorDestino:
    "id destinoId nombre ciudad categoria precioPorNoche moneda servicios fechasDisponibles disponible imagen popularidad habitacionesDisponibles tiposHabitacion {id nombre capacidad precioPorNoche}",
};
export async function consultar(tipo, destinoId, signal) {
  const result = await request("/graphql", {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query Opciones($destinoId: ID!) { ${tipo}(destinoId: $destinoId) { ${fields[tipo]} } }`,
      variables: { destinoId },
    }),
  });
  if (result.errors?.length)
    throw new Error(result.errors.map((e) => e.message).join(" "));
  const data = result.data?.[tipo];
  if (
    !Array.isArray(data) ||
    data.some((x) => !validOption(x, tipo, destinoId))
  )
    throw new Error("El servicio devolvió opciones incompletas.");
  return data;
}
