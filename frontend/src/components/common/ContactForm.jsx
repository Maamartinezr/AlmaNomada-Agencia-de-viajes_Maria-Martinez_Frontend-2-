import { useId, useRef, useState } from "react";
import { formRules, validateForm } from "../../utils/formValidation";

const emptyForm = { nombre: "", correo: "", mensaje: "" };

export default function ContactForm({
  reservation = false,
  travelers = 1,
  maxTravelers = formRules.travelersMax,
  onTravelersChange,
}) {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const fields = useRef({});
  const id = useId();
  const limit = Math.min(maxTravelers, formRules.travelersMax);

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateForm(form, {
      reservation,
      travelers,
      maxTravelers: limit,
    });
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      fields.current[firstError]?.focus();
      return;
    }
    setSent(true);
  }
  function change(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }
  function errorFor(name) {
    return errors[name] ? (
      <span id={`${id}-${name}`} className="error">
        {errors[name]}
      </span>
    ) : null;
  }
  if (sent)
    return (
      <div className="confirmation" role="status">
        <h2>
          {reservation
            ? "Tu Reserva se realizó con éxito"
            : "¡Gracias por escribirnos!"}
        </h2>
        <p>
          {form.nombre.trim()}, esta confirmación es una simulación local. No se
          enviaron correos, no se guardaron datos personales en el servidor ni
          se realizó una reserva comercial.
        </p>
        <button
          className="btn btn-outline"
          onClick={() => {
            setSent(false);
            setForm(emptyForm);
            setErrors({});
          }}
        >
          Volver al formulario
        </button>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="error">
          Revisa los campos indicados antes de continuar.
        </p>
      )}
      <label>
        Nombre
        <input
          required
          name="nombre"
          minLength={formRules.nameMin}
          maxLength={formRules.nameMax}
          autoComplete="name"
          value={form.nombre}
          ref={(element) => {
            fields.current.nombre = element;
          }}
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={errors.nombre ? `${id}-nombre` : undefined}
          onChange={(event) => change("nombre", event.target.value)}
        />
        {errorFor("nombre")}
      </label>
      <label>
        Correo electrónico
        <input
          type="email"
          required
          name="correo"
          maxLength={formRules.emailMax}
          autoComplete="email"
          value={form.correo}
          ref={(element) => {
            fields.current.correo = element;
          }}
          aria-invalid={Boolean(errors.correo)}
          aria-describedby={errors.correo ? `${id}-correo` : undefined}
          onChange={(event) => change("correo", event.target.value)}
        />
        {errorFor("correo")}
      </label>
      {reservation && (
        <label>
          Cantidad de viajeras
          <select
            name="viajeras"
            value={travelers}
            ref={(element) => {
              fields.current.viajeras = element;
            }}
            aria-invalid={Boolean(errors.viajeras)}
            aria-describedby={errors.viajeras ? `${id}-viajeras` : undefined}
            onChange={(event) => onTravelersChange(Number(event.target.value))}
          >
            {Array.from({ length: limit }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          {errorFor("viajeras")}
        </label>
      )}
      <label>
        {reservation ? "Comentarios (opcional)" : "¿En qué podemos ayudarte?"}
        <textarea
          name="mensaje"
          required={!reservation}
          minLength={reservation ? 0 : formRules.messageMin}
          maxLength={formRules.messageMax}
          rows={4}
          value={form.mensaje}
          ref={(element) => {
            fields.current.mensaje = element;
          }}
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={errors.mensaje ? `${id}-mensaje` : undefined}
          onChange={(event) => change("mensaje", event.target.value)}
        />
        {errorFor("mensaje")}
      </label>
      <p className="muted">
        Formulario de demostración. Tus datos no se envían a una agencia real.
      </p>
      <button className="btn" type="submit">
        {reservation
          ? "Solicitar reserva de demostración"
          : "Enviar mensaje de demostración"}
      </button>
    </form>
  );
}
