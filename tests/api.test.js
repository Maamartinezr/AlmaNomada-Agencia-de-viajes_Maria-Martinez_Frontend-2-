import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { app } from "../backend/app.js";
import {
  estimate,
  availableStay,
  endDate,
} from "../frontend/src/utils/travel.js";
let server, base;
before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((r) => server.close(r)));
const gql = async (query, variables) => {
  const response = await fetch(base + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return { status: response.status, body: await response.json() };
};
test("REST lista nueve destinos con país, actividades y categorías", async () => {
  const r = await fetch(base + "/api/destinos");
  assert.equal(r.status, 200);
  const data = await r.json();
  assert.equal(data.length, 9);
  for (const d of data) {
    assert.ok(d.id && d.pais && d.ciudad && d.descripcion && d.imagen);
    assert.ok(d.actividadesPopulares.length);
    assert.ok(d.categoriasAlma.length);
  }
});
test("REST detalle y 404 JSON", async () => {
  const d = await (await fetch(base + "/api/destinos/bali")).json();
  assert.equal(d.pais, "Indonesia");
  const r = await fetch(base + "/api/destinos/no-existe");
  assert.equal(r.status, 404);
  assert.ok((await r.json()).message);
});
test("CORS permite el frontend local", async () => {
  const r = await fetch(base + "/api/destinos", {
    headers: { Origin: "http://localhost:5173" },
  });
  assert.equal(
    r.headers.get("access-control-allow-origin"),
    "http://localhost:5173",
  );
});
test("GraphQL selecciona solo campos solicitados y filtra vuelos", async () => {
  const { status, body } = await gql(
    "query($id:ID!){vuelosPorDestino(destinoId:$id){id destinoId precio moneda disponible cuposDisponibles}}",
    { id: "bali" },
  );
  assert.equal(status, 200);
  assert.equal(body.data.vuelosPorDestino.length, 8);
  for (const v of body.data.vuelosPorDestino) {
    assert.equal(v.destinoId, "bali");
    assert.equal(v.moneda, "CLP");
    assert.ok(v.precio > 0);
    assert.equal(v.aerolinea, undefined);
  }
  assert.equal(body.data.vuelosPorDestino[1].disponible, false);
  assert.equal(body.data.vuelosPorDestino[1].cuposDisponibles, 0);
});
test("GraphQL hoteles por destino con fechas y servicios", async () => {
  const { body } = await gql(
    '{hotelesPorDestino(destinoId:"atacama"){id destinoId precioPorNoche moneda servicios fechasDisponibles disponible}}',
  );
  assert.equal(body.data.hotelesPorDestino.length, 3);
  assert.ok(
    body.data.hotelesPorDestino.every((h) => h.destinoId === "atacama"),
  );
  assert.ok(
    body.data.hotelesPorDestino[0].fechasDisponibles.includes("2026-12-10"),
  );
  assert.ok(body.data.hotelesPorDestino[0].servicios.length);
});
test("GraphQL devuelve lista vacía para destino sin opciones", async () => {
  const { body } = await gql(
    '{vuelosPorDestino(destinoId:"no-existe"){id} hotelesPorDestino(destinoId:"no-existe"){id}}',
  );
  assert.deepEqual(body.data, { vuelosPorDestino: [], hotelesPorDestino: [] });
});
test("GraphQL valida campos desconocidos", async () => {
  const { status, body } = await gql(
    '{vuelosPorDestino(destinoId:"bali"){campoInventado}}',
  );
  assert.equal(status, 400);
  assert.ok(body.errors.length);
});
test("GraphQL rechaza variables obligatorias ausentes", async () => {
  const { status, body } = await gql(
    "query($id:ID!){vuelosPorDestino(destinoId:$id){id}}",
    {},
  );
  assert.equal(status, 400);
  assert.ok(body.errors.length);
});
test("GraphQL rechaza cuerpo sin query", async () => {
  const { status } = await gql(undefined);
  assert.equal(status, 400);
});
test("JSON inválido produce error HTTP 400", async () => {
  const r = await fetch(base + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{incorrecto",
  });
  assert.equal(r.status, 400);
});
test("Relaciones REST/GraphQL coherentes para los nueve destinos", async () => {
  const destinos = await (await fetch(base + "/api/destinos")).json();
  for (const d of destinos) {
    const { body } = await gql(
      "query($id:ID!){vuelosPorDestino(destinoId:$id){destinoId destino} hotelesPorDestino(destinoId:$id){destinoId ciudad}}",
      { id: d.id },
    );
    assert.ok(
      body.data.vuelosPorDestino.every(
        (v) => v.destino === d.ciudad && v.destinoId === d.id,
      ),
    );
    assert.ok(
      body.data.hotelesPorDestino.every(
        (h) => h.ciudad === d.ciudad && h.destinoId === d.id,
      ),
    );
  }
});
test("Costo considera viajeras, noches y habitaciones dobles", () => {
  assert.deepEqual(
    estimate({
      vuelo: { precio: 100000, moneda: "CLP" },
      hotel: { precioPorNoche: 50000, moneda: "CLP" },
      noches: 3,
      viajeras: 3,
    }),
    { rooms: 2, flight: 300000, lodging: 300000, extras: 0, total: 600000 },
  );
});
test("Costo no mezcla monedas", () => {
  assert.equal(
    estimate({
      vuelo: { precio: 10, moneda: "USD" },
      hotel: { precioPorNoche: 10000, moneda: "CLP" },
      noches: 3,
      viajeras: 1,
    }),
    null,
  );
});
test("Disponibilidad exige cada noche y no la noche del checkout", () => {
  const h = { fechasDisponibles: ["2027-02-15", "2027-02-16"] };
  assert.equal(availableStay(h, "2027-02-15", 2), true);
  assert.equal(availableStay(h, "2027-02-15", 3), false);
  assert.equal(endDate("2027-02-28", 2), "2027-03-02");
});
