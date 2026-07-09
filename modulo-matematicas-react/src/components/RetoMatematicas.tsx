import { useRetoMatematicas } from "../hooks/useRetoMatematicas";
import Marcador from "./Marcador";
import Temporizador from "./Temporizador";

/** Componente principal del juego: orquesta el hook con los subcomponentes. */
export default function RetoMatematicas() {
  const reto = useRetoMatematicas();
  const jugando = reto.estado === "jugando";
  const respuestaVacia = reto.respuesta.trim() === "";

  const claseInput = respuestaVacia
    ? ""
    : reto.esRespuestaValida
      ? " ok"
      : " error";

  return (
    <section className="reto" aria-label="Reto de matematicas">
      <div className="reto__barra">
        <Temporizador segundosRestantes={reto.segundosRestantes} />
        <Marcador puntaje={reto.puntaje} mejorPuntaje={reto.mejorPuntaje} />
      </div>

      <div className="reto__centro">
        <p className="reto__kicker">Desafio de calculo rapido</p>
        <p className="reto__pregunta" aria-live="polite">
          {reto.estado === "inactivo" && "245 + 130 = ?"}
          {jugando && reto.pregunta?.texto}
          {reto.estado === "terminado" && "Tiempo terminado"}
        </p>
      </div>

      <form
        className="reto__form"
        onSubmit={(evento) => {
          evento.preventDefault();
          reto.comprobar();
        }}
      >
        <input
          className={`reto__input${claseInput}`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Tu respuesta..."
          value={reto.respuesta}
          onChange={(evento) => reto.cambiarRespuesta(evento.target.value)}
          disabled={!jugando}
          aria-label="Escribe tu respuesta"
        />
        <button
          type="submit"
          className="btn btn--primario"
          disabled={!reto.esRespuestaValida}
        >
          Comprobar ›
        </button>
      </form>

      <p className={`reto__feedback ${reto.feedback.tipo}`} aria-live="assertive">
        {reto.feedback.mensaje}
      </p>

      <button
        type="button"
        className="btn btn--comenzar"
        onClick={reto.comenzar}
        disabled={jugando}
      >
        {reto.estado === "inactivo" ? "Comenzar desafio" : "Jugar otra vez"}
      </button>
    </section>
  );
}
