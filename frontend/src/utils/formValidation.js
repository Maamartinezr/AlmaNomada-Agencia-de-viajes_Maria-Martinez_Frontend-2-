// Reglas compartidas por contacto y solicitud de reserva.
export const formRules = Object.freeze({
  nameMin: 2,
  nameMax: 100,
  emailMax: 160,
  messageMin: 10,
  messageMax: 2000,
  travelersMin: 1,
  travelersMax: 8,
});
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(
  form,
  {
    reservation = false,
    travelers = 1,
    maxTravelers = formRules.travelersMax,
  } = {},
) {
  const errors = {};
  const name = String(form.nombre ?? "").trim();
  const email = String(form.correo ?? "").trim();
  const message = String(form.mensaje ?? "").trim();
  if (name.length < formRules.nameMin || name.length > formRules.nameMax) {
    errors.nombre = `Escribe un nombre de ${formRules.nameMin} a ${formRules.nameMax} caracteres.`;
  }
  if (!emailPattern.test(email) || email.length > formRules.emailMax) {
    errors.correo = "Escribe un correo electrónico válido.";
  }
  if (!reservation && message.length < formRules.messageMin) {
    errors.mensaje = `Escribe un mensaje de al menos ${formRules.messageMin} caracteres.`;
  } else if (message.length > formRules.messageMax) {
    errors.mensaje = `El mensaje admite hasta ${formRules.messageMax} caracteres.`;
  }
  const limit = Math.min(formRules.travelersMax, maxTravelers);
  if (
    reservation &&
    (!Number.isInteger(travelers) ||
      travelers < formRules.travelersMin ||
      travelers > limit)
  ) {
    errors.viajeras = `Selecciona entre ${formRules.travelersMin} y ${limit} viajeras según los cupos del vuelo.`;
  }
  return errors;
}
