import { request } from "./http";
import { validDestination } from "./validation";
export const listarDestinos = (signal) =>
  request("/api/destinos", { signal }).then((data) => {
    if (!Array.isArray(data) || data.some((d) => !validDestination(d)))
      throw new Error("El catálogo de destinos está incompleto.");
    return data;
  });
export const obtenerDestino = (id, signal) =>
  request(`/api/destinos/${encodeURIComponent(id)}`, { signal });
