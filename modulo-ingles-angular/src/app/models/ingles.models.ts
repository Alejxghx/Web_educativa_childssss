// Interfaces compartidas del modulo de Ingles.

/** Una palabra de vocabulario asociada a un tema. */
export interface TemaVocabulario {
  tema: string;
  palabra: string; // en ingles
  traduccion: string; // en espanol
  emoji: string;
}

/** Una pregunta del quiz con sus opciones y la respuesta correcta. */
export interface PreguntaQuiz {
  pregunta: string;
  opciones: string[];
  correcta: string;
}

/** Feedback que se muestra tras responder. */
export interface FeedbackQuiz {
  mensaje: string;
  tipo: "ok" | "error";
}
