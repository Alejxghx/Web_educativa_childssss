import { formatearTiempo } from "../lib/tiempo";

interface Props {
  segundosRestantes: number;
}

/** Muestra el tiempo restante; resalta los ultimos 10 segundos. */
export default function Temporizador({ segundosRestantes }: Props) {
  const critico = segundosRestantes <= 10;
  const tiempo = segundosRestantes < 100 ? String(segundosRestantes) : formatearTiempo(segundosRestantes);

  return (
    <div
      className={`temporizador${critico ? " temporizador--critico" : ""}`}
      role="timer"
      aria-label="Tiempo restante"
    >
      <strong>{tiempo}</strong>
      <span>SEG</span>
    </div>
  );
}
