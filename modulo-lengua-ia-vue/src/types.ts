// Interfaces compartidas del modulo de Lengua con IA.

/** Fases del flujo del modulo. */
export type EstadoLengua =
  | "inicial" // aun no hay dibujo
  | "listo" // dibujo cargado, listo para generar
  | "generando" // esperando a la IA
  | "completo" // cuento y pregunta listos
  | "error"; // fallo la generacion

/** Respuesta estructurada que devuelve la IA. */
export interface CuentoIA {
  cuento: string;
  pregunta: string;
}

/** Dibujo cargado por el nino, listo para enviarse a la IA. */
export interface DibujoCargado {
  /** data URL completa (para la vista previa). */
  dataUrl: string;
  /** Solo el payload base64 (para la API). */
  base64: string;
  /** Tipo MIME del archivo (image/png, image/jpeg, ...). */
  mediaType: string;
}
