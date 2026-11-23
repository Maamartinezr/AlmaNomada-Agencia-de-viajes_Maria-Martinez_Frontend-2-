import { buildSchema } from "graphql";
export const schema = buildSchema(`
  type Tarifa { id: ID!, nombre: String!, precio: Float!, precioRegreso: Float! }
  type Equipaje { id: ID!, nombre: String!, precio: Float! }
  type TipoHabitacion { id: ID!, nombre: String!, capacidad: Int!, precioPorNoche: Float! }
  type Vuelo { id: ID!, destinoId: ID!, aerolinea: String!, origen: String!, destino: String!, fechaSalida: String!, fechaRegreso: String!, horaSalida: String!, horaLlegada: String!, horaSalidaRegreso: String!, horaLlegadaRegreso: String!, precio: Float!, precioRegreso: Float!, moneda: String!, disponible: Boolean!, cuposDisponibles: Int!, popularidad: Int!, escalas: String!, tarifas: [Tarifa!]!, equipajes: [Equipaje!]! }
  type Hotel { id: ID!, destinoId: ID!, nombre: String!, ciudad: String!, categoria: Int!, precioPorNoche: Float!, moneda: String!, servicios: [String!]!, fechasDisponibles: [String!]!, disponible: Boolean!, imagen: String!, popularidad: Int!, habitacionesDisponibles: Int!, tiposHabitacion: [TipoHabitacion!]! }
  type Query { vuelosPorDestino(destinoId: ID!): [Vuelo!]!, hotelesPorDestino(destinoId: ID!): [Hotel!]! }
`);
