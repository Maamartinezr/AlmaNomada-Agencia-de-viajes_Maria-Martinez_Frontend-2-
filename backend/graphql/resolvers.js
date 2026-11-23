import { vuelos, hoteles } from "../data/catalog.js";
export const resolvers = {
  vuelosPorDestino: ({ destinoId }) =>
    vuelos.filter((v) => v.destinoId === destinoId),
  hotelesPorDestino: ({ destinoId }) =>
    hoteles.filter((h) => h.destinoId === destinoId),
};
