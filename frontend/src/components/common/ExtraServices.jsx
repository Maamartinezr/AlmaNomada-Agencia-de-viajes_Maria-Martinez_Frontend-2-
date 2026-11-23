import { extrasGroups } from "../../data/extras";
import { money } from "../../utils/travel";
const servicePhotos = {
  traslado: { file: 'aeropuerto', alt: 'Taxis en la zona de acceso de un aeropuerto', position: 'center 70%' },
  alquiler: { file: 'alquileres', alt: 'Motos y bicicletas estacionadas junto a una calle arbolada' },
  'city-tour': { file: 'city-tour', position: 'center 65%' },
  cultura: { file: 'naturaleza-arte' },
  nocturno: { file: 'tour-nocturno' },
};
const photoUrl = (file) => `${import.meta.env.BASE_URL}images/servicios/${file}.jpg`;
export default function ExtraServices({ selectedIds = [], onChange, travelers = 1, readOnly = false }) {
  const Card = readOnly ? 'article' : 'label';
  function toggle(item, group) {
    const selected = selectedIds.includes(item.id);
    let ids = selectedIds.filter((id) => id !== item.id);
    if (!selected) {
      if (group.id === "traslado")
        ids = ids.filter((id) => !group.items.some((entry) => entry.id === id));
      ids.push(item.id);
    }
    onChange(ids);
  }
  return (
    <div className="extra-groups">
      {extrasGroups.map((group) => (
        <section key={group.id}>
          <div className={`extra-intro${servicePhotos[group.id] ? ' extra-intro-photo' : ''}`}>
            <div>
              <h2>{group.name}</h2>
              <p>{group.description}</p>
            </div>
            {servicePhotos[group.id] && <img
              className="extra-section-image"
              src={photoUrl(servicePhotos[group.id].file)}
              alt={servicePhotos[group.id].alt}
              style={{ objectPosition: servicePhotos[group.id].position }}
              width="1200" height="800" loading="lazy" decoding="async"
            />}
          </div>
          <div className="extra-grid">
            {group.items.map((item) => (
              <Card className={`extra-card${servicePhotos[item.id] ? ' extra-card-photo' : ''}${readOnly ? ' extra-card-info' : ''}`} key={item.id}>
                {servicePhotos[item.id] && <img
                  className="extra-activity-image"
                  src={photoUrl(servicePhotos[item.id].file)}
                  alt=""
                  style={{ objectPosition: servicePhotos[item.id].position }}
                  width="1200" height={item.id === 'city-tour' ? '1800' : '800'} loading="lazy" decoding="async"
                />}
                <div className="extra-card-body">
                {!readOnly && <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  disabled={item.capacidad && travelers > item.capacidad}
                  onChange={() => toggle(item, group)}
                />}
                <span>
                  <strong>{item.nombre}</strong>
                  <span>{item.descripcion}</span>
                  <b>
                    {money(item.precio)} CLP{" "}
                    {group.id === "actividad"
                      ? "/ persona"
                      : group.id === "alquiler"
                        ? "/ vehículo / día"
                        : "/ vehículo / ida y vuelta"}
                  </b>
                  {item.capacidad && travelers > item.capacidad && (
                    <span className="error">
                      Capacidad insuficiente para {travelers} viajeras.
                    </span>
                  )}
                </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
