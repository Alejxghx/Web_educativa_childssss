import { useNavigate } from "react-router-dom";
import ListaActividades from "../components/ListaActividades";
import { useMatematicas } from "../context/MatematicasContext";

export default function InicioView() {
  const {
    actividades,
    filtro,
    setFiltro,
    actividadesFiltradas,
    progreso,
    totalPuntos,
  } = useMatematicas();
  const navigate = useNavigate();
  const completadas = progreso.filter((item) => item.practicada).length;

  return (
    <>
      <section className="practice-panel">
        <div>
          <p className="practice-panel__kicker">Practica guiada</p>
          <h1>Actividades de Matematicas</h1>
          <p>
            Escoge una actividad, revisa su objetivo y marca el avance real del
            modulo.
          </p>
        </div>
        <div className="practice-panel__stats">
          <div>
            <strong>{completadas}</strong>
            <span>completadas</span>
          </div>
          <div>
            <strong>{actividades.length}</strong>
            <span>actividades</span>
          </div>
          <div>
            <strong>{totalPuntos}</strong>
            <span>puntos</span>
          </div>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <h2>Sigue Practicando</h2>
          <p>El avance sale del estado global, no de porcentajes inventados.</p>
        </div>
        <label className="filtro">
          <input
            type="search"
            value={filtro}
            onChange={(evento) => setFiltro(evento.target.value)}
            placeholder="Buscar tema"
            aria-label="Filtrar por titulo, descripcion o nivel"
          />
        </label>
      </section>

      <ListaActividades
        actividades={actividadesFiltradas}
        progreso={progreso}
        onSeleccionar={(id) => navigate(`/actividades/${id}`)}
      />
    </>
  );
}
