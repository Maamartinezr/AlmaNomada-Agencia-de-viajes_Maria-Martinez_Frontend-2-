export const extrasGroups = [
  {
    id: "traslado",
    name: "Transporte desde y hacia el aeropuerto",
    description:
      "Traslado de ida y vuelta para comenzar y terminar tu viaje con tranquilidad. Precio por vehículo para ambos trayectos.",
    items: [
      {
        id: "transfer-4x4",
        nombre: "Todo terreno 4x4",
        descripcion:
          "Una opción cómoda para rutas con tramos rurales. Hasta 4 viajeras.",
        precio: 95000,
        capacidad: 4,
      },
      {
        id: "transfer-standard",
        nombre: "Estándar",
        descripcion: "Traslado urbano en auto para hasta 3 viajeras.",
        precio: 60000,
        capacidad: 3,
      },
      {
        id: "transfer-van",
        nombre: "Mini van",
        descripcion:
          "Espacio para compartir el trayecto en grupo. Hasta 8 viajeras.",
        precio: 120000,
        capacidad: 8,
      },
    ],
  },
  {
    id: "alquiler",
    name: "Alquiler de motos, autos y bicicletas",
    description:
      "Muévete a tu ritmo. Precio por vehículo y día; se estima un día de alquiler. Requisitos y disponibilidad sujetos a revisión en un servicio real.",
    items: [
      {
        id: "rent-4x4",
        nombre: "Todo terreno 4x4",
        descripcion: "Para explorar caminos y paisajes fuera del centro.",
        precio: 65000,
      },
      {
        id: "rent-simple",
        nombre: "Camioneta sencilla",
        descripcion: "Comodidad para recorridos cotidianos y escapadas.",
        precio: 48000,
      },
      {
        id: "rent-pickup",
        nombre: "Camioneta Pick-up",
        descripcion: "Más espacio para el equipaje de tu aventura.",
        precio: 62000,
      },
      {
        id: "rent-vespa",
        nombre: "Moto tipo Vespa",
        descripcion: "Un paseo urbano con estilo, para una persona.",
        precio: 27000,
      },
      {
        id: "rent-moto",
        nombre: "Moto de turismo",
        descripcion: "Recorridos por carretera a tu propio ritmo.",
        precio: 35000,
      },
      {
        id: "rent-mountain",
        nombre: "Bicicleta montañera",
        descripcion: "Una alternativa para senderos y rutas de naturaleza.",
        precio: 18000,
      },
      {
        id: "rent-bike",
        nombre: "Bicicleta estándar",
        descripcion: "Disfruta paseos tranquilos por la ciudad.",
        precio: 12000,
      },
    ],
  },
  {
    id: "actividad",
    name: "Actividades y paseos",
    description:
      "Propuestas comunes a todos los destinos, sujetas a disponibilidad local. Precio por viajera y actividad.",
    items: [
      {
        id: "city-tour",
        nombre: "Centro histórico y City Tour",
        descripcion:
          "Recorre calles, plazas y lugares emblemáticos con una mirada cercana a la historia local.",
        precio: 22000,
      },
      {
        id: "cultura",
        nombre: "Naturaleza, historia y arte",
        descripcion:
          "Una visita al jardín botánico, zoológico o museo local, según la oferta disponible en el destino.",
        precio: 28000,
      },
      {
        id: "nocturno",
        nombre: "Tour nocturno y zona de bares",
        descripcion:
          "Conoce la vida nocturna acompañada en un recorrido por zonas de encuentro y música. Consumos no incluidos.",
        precio: 25000,
      },
    ],
  },
];
export const extrasCatalog = extrasGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, grupo: group.id })),
);
export function extrasTotal(ids = [], travelers = 1) {
  return extrasCatalog
    .filter((item) => ids.includes(item.id))
    .reduce(
      (sum, item) =>
        sum + item.precio * (item.grupo === "actividad" ? travelers : 1),
      0,
    );
}
