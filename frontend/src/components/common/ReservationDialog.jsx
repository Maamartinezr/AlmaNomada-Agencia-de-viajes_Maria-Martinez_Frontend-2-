import { useEffect, useRef } from "react";
export default function ReservationDialog({ onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current,
      previous = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      className="reservation-dialog"
      ref={ref}
      aria-labelledby="reservation-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="dialog-top">
        <h2 id="reservation-title">Solicitud de reserva</h2>
        <button
          className="text-button"
          onClick={onClose}
          aria-label="Cerrar solicitud de reserva"
        >
          Cerrar
        </button>
      </div>
      {children}
    </dialog>
  );
}
