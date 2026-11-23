import { useNavigate } from "react-router-dom";
import { useTravel } from "../../context/TravelContext";
import { date } from "../../utils/travel";
export default function DepartureDates({ destination }) {
  const { selectDestination } = useTravel(),
    navigate = useNavigate();
  return (
    <div className="departure-dates">
      <h4>Salidas disponibles</h4>
      {destination.fechasDisponibles.map((schedule) => (
        <button
          type="button"
          key={schedule.salida}
          onClick={() => {
            selectDestination(destination, schedule);
            navigate(`/vuelos/${destination.id}`);
          }}
        >
          <strong>{date(schedule.salida)}</strong>
          <span>
            Regreso {date(schedule.regreso)} · {schedule.noches} noches
          </span>
        </button>
      ))}
    </div>
  );
}
