import { test } from "node:test";
import assert from "node:assert/strict";
import { destinos, vuelos, hoteles } from "../backend/data/catalog.js";
import {
  flightFare,
  estimate,
  roomRate,
  sortOptions,
  timePeriod,
  availableStay,
  duration,
} from "../frontend/src/utils/travel.js";
import { extrasGroups, extrasTotal } from "../frontend/src/data/extras.js";
const base = {
  vuelo: vuelos[0],
  hotel: hoteles[0],
  clase: "economica",
  equipaje: "bolso",
  tipoViaje: "solo-ida",
  tipoHabitacion: "doble",
  habitaciones: 1,
  noches: 4,
  viajeras: 1,
  extras: [],
};
test("Nueve destinos con dos salidas y noches consistentes", () => {
  assert.equal(destinos.length, 9);
  for (const d of destinos) {
    assert.equal(d.fechasDisponibles.length, 2);
    for (const s of d.fechasDisponibles)
      assert.equal(duration(s.salida, s.regreso), s.noches);
  }
  assert.equal(
    destinos.find((d) => d.id === "roma").fechasDisponibles[0].salida,
    "2026-12-28",
  );
  assert.equal(
    destinos.find((d) => d.id === "bali").fechasDisponibles[1].noches,
    12,
  );
});
test("Cada fecha tiene cuatro vuelos y tres disponibles", () => {
  for (const d of destinos)
    for (const s of d.fechasDisponibles) {
      const list = vuelos.filter(
        (v) => v.destinoId === d.id && v.fechaSalida === s.salida,
      );
      assert.equal(list.length, 4);
      assert.equal(list.filter((v) => v.disponible).length, 3);
      assert.ok(
        list.every(
          (v) => v.fechaRegreso === s.regreso && !v.aerolinea.includes("Mock"),
        ),
      );
    }
});
test("Todos los vuelos admiten tres categorías y tres equipajes con precios distintos", () => {
  for (const v of vuelos) {
    assert.equal(v.tarifas.length, 3);
    assert.equal(v.equipajes.length, 3);
    assert.ok(
      flightFare(v, base) < flightFare(v, { ...base, clase: "ejecutiva" }),
    );
    assert.ok(
      flightFare(v, { ...base, clase: "ejecutiva" }) <
        flightFare(v, { ...base, clase: "primera" }),
    );
    assert.ok(
      flightFare(v, base) < flightFare(v, { ...base, equipaje: "cabina" }),
    );
    assert.ok(
      flightFare(v, { ...base, equipaje: "cabina" }) <
        flightFare(v, { ...base, equipaje: "facturada" }),
    );
  }
});
test("Ida y vuelta suma regreso y equipaje en ambos tramos", () => {
  const v = vuelos[0];
  assert.equal(
    flightFare(v, { ...base, tipoViaje: "ida-vuelta", equipaje: "facturada" }),
    v.tarifas[0].precio + v.tarifas[0].precioRegreso + 84000,
  );
});
test("Ordenar no modifica los datos y utiliza precio o popularidad", () => {
  const data = [
    { id: 1, precio: 30, popularidad: 1 },
    { id: 2, precio: 10, popularidad: 4 },
  ];
  assert.deepEqual(sortOptions(data,'precio-asc',x=>x.precio).map(x=>x.id),[2,1]);
  assert.deepEqual(sortOptions(data,'precio-desc',x=>x.precio).map(x=>x.id),[1,2]);
  assert.deepEqual(sortOptions(data,'popularidad',x=>x.precio).map(x=>x.id),[2,1]);
  assert.deepEqual(data.map(x=>x.id),[1,2]);
  assert.equal(sortOptions(data, "precio-asc", (x) => x.precio)[0].id, 2);
  assert.equal(sortOptions(data, "precio-desc", (x) => x.precio)[0].id, 1);
  assert.equal(sortOptions(data, "popularidad", (x) => x.precio)[0].id, 2);
  assert.equal(data[0].id, 1);
});
test("Horarios incluyen límites y madrugada", () => {
  for (const [t, p] of [
    ["05:59", "noche"],
    ["06:00", "manana"],
    ["11:59", "manana"],
    ["12:00", "tarde"],
    ["19:59", "tarde"],
    ["20:00", "noche"],
  ])
    assert.equal(timePeriod(t), p);
});
test("Hoteles cubren todas las estancias publicadas y Refugio está habilitado", () => {
  for (const d of destinos)
    for (const h of hoteles.filter((h) => h.destinoId === d.id)) {
      assert.ok(h.disponible);
      for (const s of d.fechasDisponibles)
        assert.ok(availableStay(h, s.salida, s.noches));
    }
  assert.ok(hoteles.find((h) => h.id === "atacama-h3").disponible);
});
test("Suite y cantidad de habitaciones cambian el total hasta 25", () => {
  assert.ok(
    roomRate(base.hotel, { tipoHabitacion: "suite" }) >
      roomRate(base.hotel, base),
  );
  assert.equal(
    estimate({ ...base, habitaciones: 25 }).lodging,
    estimate(base).lodging * 25,
  );
  assert.ok(
    estimate({ ...base, tipoHabitacion: "suite" }).total > estimate(base).total,
  );
});
test("Servicios incluyen las tres familias y actividades por viajera", () => {
  assert.deepEqual(
    extrasGroups.map((g) => g.items.length),
    [3, 7, 3],
  );
  assert.equal(extrasTotal(["city-tour"], 3), 66000);
  assert.equal(
    estimate({ ...base, extras: ["city-tour"] }).total,
    estimate(base).total + 22000,
  );
});
