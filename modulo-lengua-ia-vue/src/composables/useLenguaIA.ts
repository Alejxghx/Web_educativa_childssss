import { computed, onUnmounted, ref } from "vue";
import { generarCuento } from "../lib/groq";
import type { CuentoIA, DibujoCargado, EstadoLengua } from "../types";

const CLAVE_RESPUESTA = "drawtale-respuesta-lectura";
const MENSAJES_LOADER = [
  "Analizando el dibujo…",
  "Creando personajes…",
  "Escribiendo el cuento…",
];

/** Encapsula el flujo completo: subir dibujo, generar cuento y responder. */
export function useLenguaIA() {
  const estado = ref<EstadoLengua>("inicial");
  const dibujo = ref<DibujoCargado | null>(null);
  const cuento = ref<CuentoIA | null>(null);
  const error = ref("");
  const mensajeLoader = ref(MENSAJES_LOADER[0]);
  const respuesta = ref(localStorage.getItem(CLAVE_RESPUESTA) ?? "");
  const guardado = ref(respuesta.value.trim().length > 0);

  // Paso visible (1, 2 o 3) derivado del estado.
  const paso = computed(() => {
    if (estado.value === "generando") return 2;
    if (estado.value === "completo") return 3;
    return 1;
  });

  let loaderTimer: number | undefined;

  function iniciarLoader(): void {
    let i = 0;
    mensajeLoader.value = MENSAJES_LOADER[0];
    loaderTimer = window.setInterval(() => {
      i = (i + 1) % MENSAJES_LOADER.length;
      mensajeLoader.value = MENSAJES_LOADER[i];
    }, 1800);
  }

  function detenerLoader(): void {
    if (loaderTimer !== undefined) {
      window.clearInterval(loaderTimer);
      loaderTimer = undefined;
    }
  }

  /** Lee el archivo elegido y prepara la vista previa + el base64. */
  function cargarDibujo(archivo: File): void {
    const reader = new FileReader();
    reader.onload = (evento) => {
      const resultado = evento.target?.result as string;
      dibujo.value = {
        dataUrl: resultado,
        base64: resultado.split(",")[1] ?? "",
        mediaType: archivo.type,
      };
      cuento.value = null;
      error.value = "";
      estado.value = "listo";
    };
    reader.readAsDataURL(archivo);
  }

  /** Envia el dibujo a la IA y gestiona los estados de carga/error. */
  async function generar(): Promise<void> {
    if (!dibujo.value) return;

    estado.value = "generando";
    error.value = "";
    iniciarLoader();

    try {
      cuento.value = await generarCuento(
        dibujo.value.base64,
        dibujo.value.mediaType,
      );
      estado.value = "completo";
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Error inesperado.";
      estado.value = "error";
    } finally {
      detenerLoader();
    }
  }

  /** Persiste la respuesta del niño en localStorage en cada cambio. */
  function guardarRespuesta(texto: string): void {
    respuesta.value = texto;
    localStorage.setItem(CLAVE_RESPUESTA, texto);
    guardado.value = texto.trim().length > 0;
  }

  onUnmounted(detenerLoader);

  return {
    estado,
    dibujo,
    cuento,
    error,
    mensajeLoader,
    respuesta,
    guardado,
    paso,
    cargarDibujo,
    generar,
    guardarRespuesta,
  };
}
