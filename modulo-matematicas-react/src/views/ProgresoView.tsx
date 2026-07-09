import { Link } from "react-router-dom";
import { useMatematicas } from "../context/MatematicasContext";

export default function ProgresoView() {
  const { actividades, progreso, totalPuntos } = useMatematicas();
  const practicadas = progreso.filter((item) => item.practicada).length;

  return (
    <section className="panel">
      <h2>Progreso global</h2>
      <p>Estos datos se actualizan desde el mismo estado global usado en Practica.</p>
      <div className="resumen">
        <div>
          <span className="resumen__valor">{practicadas}</span>
          <span className="resumen__label">
            completadas de {actividades.length}
          </span>
        </div>
        <div>
          <span className="resumen__valor">{totalPuntos}</span>
          <span className="resumen__label">puntos</span>
        </div>
      </div>

      <div className="progreso-lista">
        {actividades.map((actividad) => {
          const item = progreso.find(
            (actual) => actual.actividadId === actividad.id,
          );
          return (
            <article className="progreso-item" key={actividad.id}>
              <div>
                <h3>{actividad.titulo}</h3>
                <p>{item?.practicada ? "Practicada" : "Pendiente"}</p>
              </div>
              <span>{item?.intentos ?? 0} intentos</span>
            </article>
          );
        })}
      </div>

      <Link className="btn btn--primario btn--link" to="/">
        Volver a actividades
      </Link>
    </section>
  );
}
