import { mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const write = (path, data) => {
  mkdirSync(resolve(root, path, ".."), { recursive: true });
  writeFileSync(resolve(root, path), data);
};
const imageIds = [
  "photo-1578147872305-53e7cf8bdf80",
  "photo-1526392060635-9d6019884377",
  "photo-1714686495394-73e2bb1bbd39",
  "photo-1613395877344-13d4a8e0d49e",
  "photo-1552832230-c0197dd311b5",
  "photo-1537996194471-e657df975ab4",
];
const rows = [
  [
    "atacama",
    "San Pedro de Atacama",
    "Chile",
    "San Pedro de Atacama",
    "Paisajes que parecen de otro planeta. Encuentra silencio entre salares, lagunas y cielos infinitos.",
    ["Valle de la Luna", "Lagunas altiplánicas", "Observación de estrellas"],
    ["solo", "friends", "wellness"],
    189000,
    65000,
  ],
  [
    "cusco",
    "Cusco",
    "Perú",
    "Cusco",
    "Historia viva, montañas sagradas y caminos que invitan a descubrir otra forma de mirar.",
    ["Valle Sagrado", "Centro histórico", "Cultura andina"],
    ["solo", "club"],
    249000,
    72000,
  ],
  [
    "cartagena",
    "Cartagena",
    "Colombia",
    "Cartagena",
    "Calles de colores, brisa caribeña y tardes que se alargan entre risas y encuentros.",
    ["Ciudad amurallada", "Islas del Rosario", "Gastronomía caribeña"],
    ["friends", "club", "plenitud"],
    369000,
    89000,
  ],
  [
    "santorini",
    "Santorini",
    "Grecia",
    "Fira",
    "El azul del Egeo, pueblos blancos y puestas de sol para guardar en la memoria.",
    ["Paseo por Oia", "Navegación por la caldera", "Cocina mediterránea"],
    ["friends", "plenitud", "wellness"],
    989000,
    132000,
  ],
  [
    "roma",
    "Roma",
    "Italia",
    "Roma",
    "Arte en cada esquina, plazas llenas de vida y el placer de recorrer sin prisa.",
    ["Coliseo", "Barrio de Trastevere", "Museos y arte"],
    ["solo", "club", "plenitud"],
    849000,
    115000,
  ],
  [
    "bali",
    "Bali",
    "Indonesia",
    "Ubud",
    "Respira profundo entre arrozales, templos y jardines. Un viaje para volver a ti.",
    ["Yoga", "Arrozales de Ubud", "Templos y bienestar"],
    ["solo", "wellness", "friends"],
    1129000,
    96000,
  ],
];
const destinations = rows.map(
  ([
    id,
    nombre,
    pais,
    ciudad,
    descripcion,
    actividadesPopulares,
    categoriasAlma,
  ]) => ({
    id,
    nombre,
    pais,
    ciudad,
    descripcion,
    actividadesPopulares,
    categoriasAlma,
    imagen: `/images/${id}.jpg`,
  }),
);
const flights = rows.flatMap(([id, n, p, c, d, a, cats, price]) =>
  [0, 1, 2].map((i) => ({
    id: `${id}-v${i + 1}`,
    destinoId: id,
    aerolinea:
      ["Aerolínea Horizonte", "Aerolínea Austral", "Aerolínea del Sol"][i] +
      " · Mock",
    origen: "Santiago de Chile",
    destino: c,
    fechaSalida: `2027-02-${i === 1 ? "17" : "15"}`,
    horaSalida: ["08:30", "11:45", "20:10"][i],
    horaLlegada: ["14:20", "18:35", "23:40"][i],
    precio: price + i * 39000,
    moneda: "CLP",
    disponible: i !== 2,
    cuposDisponibles: i === 2 ? 0 : 8 - i * 3,
  })),
);
const nights = Array.from(
  { length: 28 },
  (_, i) => `2027-02-${String(i + 1).padStart(2, "0")}`,
);
const hotels = rows.flatMap(([id, n, p, c, d, a, cats, price, rate]) =>
  [0, 1, 2].map((i) => ({
    id: `${id}-h${i + 1}`,
    destinoId: id,
    nombre:
      ["Casa del Horizonte", "Jardín de la Calma", "Refugio Nómada"][i] +
      " · " +
      n,
    ciudad: c,
    categoria: i === 1 ? 5 : 4,
    precioPorNoche: rate + i * 18000,
    moneda: "CLP",
    servicios: [
      "Wi-Fi",
      "Desayuno",
      "Baño privado",
      i === 1 ? "Spa" : "Jardín",
    ],
    fechasDisponibles: i === 2 ? [] : nights,
    disponible: i !== 2,
    imagen: `/images/${id}.jpg`,
  })),
);
for (const [name, data] of Object.entries({
  destinos: destinations,
  vuelos: flights,
  hoteles: hotels,
}))
  write(`backend/data/${name}.json`, JSON.stringify(data, null, 2));
const symbol =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" fill="none" stroke="COLOR" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 68V47a43 43 0 0 1 86 0v21M8 76a43 43 0 0 0 84 0M12 63q11-22 26 0m-6-8 18-21 19 22M10 72q20 12 42-3t36-2M15 82q21 14 44-1t25-2M50 13v12m-6-6h12m-6-5 2 5-2 5-2-5Z"/></svg>';
write("frontend/public/images/isotipo.svg", symbol.replace("COLOR", "#BC735C"));
write(
  "frontend/public/images/isotipo-mono.svg",
  symbol.replace("COLOR", "#FAF6F0"),
);
for (const [name, width, height, body] of [
  [
    "logo-horizontal",
    490,
    120,
    '<text x="118" y="51" font-family="Georgia,serif" font-size="35" fill="#302F2B">ALMA NÓMADA</text><text x="120" y="82" font-family="Arial,sans-serif" font-size="18" fill="#BC735C">Viaja libre. Vive a tu manera.</text>',
  ],
  [
    "logo-principal",
    490,
    280,
    '<text x="245" y="218" text-anchor="middle" font-family="Georgia,serif" font-size="42" fill="#302F2B">ALMA NÓMADA</text><text x="245" y="253" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#BC735C">Viaja libre. Vive a tu manera.</text>',
  ],
])
  write(
    `frontend/public/images/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image href="isotipo.svg" x="${name === "logo-principal" ? 165 : 0}" width="${name === "logo-principal" ? 160 : 100}" height="${name === "logo-principal" ? 180 : 110}"/>${body}</svg>`,
  );
const attachment =
  "C:/Users/Marialex/Desktop/DUOC UC/9no/Frontend II/S5 sumativa 2/";
copyFileSync(
  attachment + "Screenshot 2026-11-22 222954.png",
  resolve(root, "frontend/public/images/logo-original.png"),
);
copyFileSync(
  attachment + "Screenshot 2026-11-22 223002.png",
  resolve(root, "frontend/public/images/isotipo-original.png"),
);
for (let i = 0; i < rows.length; i++) {
  const response = await fetch(
    `https://images.unsplash.com/${imageIds[i]}?auto=format&fit=crop&w=1600&q=85`,
  );
  if (!response.ok)
    throw new Error("Imagen " + rows[i][0] + ": " + response.status);
  write(
    `frontend/public/images/${rows[i][0]}.jpg`,
    Buffer.from(await response.arrayBuffer()),
  );
  console.log("Recurso local:", rows[i][0]);
}
write(
  "docs/recursos.md",
  `# Recursos visuales\n\nLogotipo original aportado por la usuaria. Las versiones SVG son aproximaciones vectoriales, no reproducciones exactas. El encabezado utiliza el isotipo original.\n\nFotografías de Unsplash utilizadas como ambientación ilustrativa de viajes, no como garantía de ubicación u hotel real:\n\n${rows.map((r, i) => "- " + r[0] + ": https://images.unsplash.com/" + imageIds[i]).join("\n")}\n\nTipografías Playfair Display, Montserrat y Caveat distribuidas mediante Fontsource y sus licencias incluidas en los paquetes. Iconos Lucide (ISC).`,
);
