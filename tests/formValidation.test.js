import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formRules,
  validateForm,
} from "../frontend/src/utils/formValidation.js";

const valid = {
  nombre: "María",
  correo: "viajera@example.com",
  mensaje: "Quiero conocer las experiencias.",
};

test("Contacto y reserva comparten validación de nombre y correo", () => {
  for (const reservation of [false, true]) {
    const errors = validateForm(
      { ...valid, nombre: "   ", correo: "correo-invalido" },
      { reservation },
    );
    assert.ok(errors.nombre);
    assert.ok(errors.correo);
  }
});

test("Contacto exige mensaje y reserva permite comentarios opcionales", () => {
  const form = { ...valid, mensaje: "" };
  assert.ok(validateForm(form).mensaje);
  assert.deepEqual(validateForm(form, { reservation: true }), {});
  assert.deepEqual(
    validateForm({ ...form, mensaje: "Hola" }, { reservation: true }),
    {},
  );
});

test("Los límites de texto se aplican también fuera de los atributos HTML", () => {
  assert.ok(
    validateForm({ ...valid, nombre: "A".repeat(formRules.nameMax + 1) })
      .nombre,
  );
  assert.ok(
    validateForm({
      ...valid,
      correo: "a".repeat(formRules.emailMax) + "@example.com",
    }).correo,
  );
  for (const reservation of [false, true]) {
    assert.ok(
      validateForm(
        { ...valid, mensaje: "x".repeat(formRules.messageMax + 1) },
        { reservation },
      ).mensaje,
    );
  }
});

test("Los límites de viajeras respetan cupos e impiden cantidades inválidas", () => {
  for (const travelers of [0, -1, 1.5, NaN, 6, 9]) {
    assert.ok(
      validateForm(valid, { reservation: true, travelers, maxTravelers: 5 })
        .viajeras,
    );
  }
  assert.deepEqual(
    validateForm(valid, { reservation: true, travelers: 5, maxTravelers: 5 }),
    {},
  );
});

test("Espacios externos válidos no alteran los datos originales", () => {
  const form = Object.freeze({
    ...valid,
    nombre: " María ",
    correo: " viajera@example.com ",
  });
  assert.deepEqual(validateForm(form), {});
  assert.equal(form.nombre, " María ");
  assert.equal(form.correo, " viajera@example.com ");
});

test("Un formulario incompleto devuelve errores y no una excepción", () => {
  assert.deepEqual(Object.keys(validateForm({})), [
    "nombre",
    "correo",
    "mensaje",
  ]);
});
