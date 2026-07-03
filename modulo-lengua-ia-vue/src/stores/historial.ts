import { defineStore } from "pinia";
import type { Cuento } from "../types";

const CLAVE_HISTORIAL = "drawtale-historial-cuentos";

function cargarDesdeStorage(): Cuento[] {
  try {
    const crudo = localStorage.getItem(CLAVE_HISTORIAL);
    return crudo ? (JSON.parse(crudo) as Cuento[]) : [];
  } catch {
    return [];
  }
}

/**
 * Estado global del modulo: la lista de cuentos generados.
 * Se comparte entre la pantalla de generacion (agrega cuentos),
 * el historial (los lista) y el detalle (lee uno por id).
 */
export const useHistorialStore = defineStore("historial", {
  state: () => ({
    cuentos: cargarDesdeStorage() as Cuento[],
  }),

  getters: {
    /** Cuentos ordenados del mas reciente al mas antiguo. */
    ordenados: (state): Cuento[] =>
      [...state.cuentos].sort((a, b) => b.fecha.localeCompare(a.fecha)),

    /** Busca un cuento por id (usado por la ruta dinamica /cuento/:id). */
    obtenerPorId: (state) => {
      return (id: string): Cuento | undefined =>
        state.cuentos.find((c) => c.id === id);
    },

    total: (state): number => state.cuentos.length,
  },

  actions: {
    /** Agrega un cuento nuevo al historial y lo persiste. Devuelve su id. */
    agregar(datos: Omit<Cuento, "id" | "fecha" | "respuesta">): string {
      const nuevo: Cuento = {
        ...datos,
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
        respuesta: "",
      };
      this.cuentos.push(nuevo);
      this.persistir();
      return nuevo.id;
    },

    /** Actualiza la respuesta del nino para un cuento existente. */
    actualizarRespuesta(id: string, texto: string): void {
      const cuento = this.cuentos.find((c) => c.id === id);
      if (cuento) {
        cuento.respuesta = texto;
        this.persistir();
      }
    },

    persistir(): void {
      localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(this.cuentos));
    },
  },
});
