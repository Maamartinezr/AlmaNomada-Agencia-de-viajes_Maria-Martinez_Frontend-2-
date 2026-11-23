import { useSearchParams } from "react-router-dom";
import { useRemote } from "../hooks/useRemote";
import { listarDestinos } from "../services/destinosService";
import { Heading, RemoteState } from "../components/common/UI";
import DestinationCard from "../components/destinations/DestinationCard";
import { experiences } from "../data/experiences";
export default function Destinations() {
  const state = useRemote(listarDestinos);
  const [params, setParams] = useSearchParams();
  const search = params.get("buscar") || "",
    country = params.get("pais") || "",
    category = params.get("alma") || "";
  const change = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };
  const normalize = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const list =
    state.data?.filter(
      (d) =>
        (!search || normalize(d.nombre).includes(normalize(search))) &&
        (!country || d.pais === country) &&
        (!category || d.categoriasAlma.includes(category)),
    ) || [];
  return (
    <section className="section page">
      <Heading
        eyebrow="QUE LA CURIOSIDAD TE LLEVE"
        title="Un mundo de posibilidades"
      >
        Encuentra ese lugar al que tu alma ya quiere ir.
      </Heading>
      <div className="filters">
        <label>
          Busca tu destino
          <input
            type="search"
            placeholder="¿A dónde quieres ir?"
            value={search}
            onChange={(e) => change("buscar", e.target.value)}
          />
        </label>
        <label>
          País
          <select
            value={country}
            onChange={(e) => change("pais", e.target.value)}
          >
            <option value="">Todos los países</option>
            {[...new Set(state.data?.map((d) => d.pais))].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label>
          Tu forma de viajar
          <select
            value={category}
            onChange={(e) => change("alma", e.target.value)}
          >
            <option value="">Todas las experiencias</option>
            {experiences.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
        <button className="text-button" onClick={() => setParams({})}>
          Limpiar filtros
        </button>
      </div>
      <RemoteState state={state}>
        <p className="result-count">{list.length} destinos para inspirarte</p>
        {list.length ? (
          <div className="destination-grid">
            {list.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        ) : (
          <div className="state">
            <h2>No encontramos destinos con estos filtros</h2>
            <p>Prueba con otro nombre, país o experiencia.</p>
            <button className="btn" onClick={() => setParams({})}>
              Ver todos los destinos
            </button>
          </div>
        )}
      </RemoteState>
    </section>
  );
}
