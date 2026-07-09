import type { ActividadEducativa, ProgresoActividad } from "../types";

interface Props {
  actividades: ActividadEducativa[];
  progreso: ProgresoActividad[];
  onSeleccionar: (id: string) => void;
}

/** Renderiza actividades recibidas por props y comunica la seleccion al padre. */
export default function ListaActividades({
  actividades,
  progreso,
  onSeleccionar,
}: Props) {
  return (
    <section className="actividades" aria-label="Actividades del modulo">
      {actividades.length === 0 && (
        <p className="actividades__vacio">No hay actividades con ese filtro.</p>
      )}
      <div className="actividades__grid">
        {actividades.map((actividad, index) => {
          const avance = progreso.find(
            (item) => item.actividadId === actividad.id,
          );
          const porcentaje = avance?.practicada ? 100 : 0;
          const estado = avance?.practicada ? "Completada" : "Pendiente";

          return (
            <article className="card" key={actividad.id}>
              <span className={`card__icon card__icon--${index % 3}`}>
                {index === 0 ? "+" : index === 1 ? "-" : "#"}
              </span>
              <h3>{actividad.titulo}</h3>
              <p>{actividad.descripcion}</p>
              <div
                className="card__progress"
                aria-label={`${porcentaje}% completado`}
              >
                <span style={{ width: `${porcentaje}%` }} />
              </div>
              <small>
                {estado} - {avance?.intentos ?? 0} intentos
              </small>
              <button
                type="button"
                className="btn btn--secundario"
                onClick={() => onSeleccionar(actividad.id)}
              >
                {avance?.practicada ? "Revisar detalle" : "Practicar tema"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
