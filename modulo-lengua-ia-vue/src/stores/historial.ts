import { defineStore } from "pinia";
import type { Cuento } from "../types";
import { supabase } from "../lib/supabase";

/**
 * Estado global del modulo: la lista de cuentos generados.
 * Persiste en Supabase en vez de localStorage para cumplir
 * el requisito de backend compartido del Hito 4.
 */
export const useHistorialStore = defineStore("historial", {
  state: () => ({
    cuentos: [] as Cuento[],
    cargando: true,
    usuarioId: null as string | null,
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
    async iniciar() {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user
      if (!user) { window.location.href = '/'; return }
      this.usuarioId = user.id

      const { data: cuentos } = await supabase
        .from('cuentos')
        .select('*')
        .eq('usuario_id', user.id)
        .order('fecha', { ascending: false })

      if (cuentos) {
        this.cuentos = cuentos.map((c: any) => ({
          id: c.id,
          dibujoDataUrl: c.dibujo_data_url,
          texto: c.texto,
          pregunta: c.pregunta,
          respuesta: c.respuesta ?? '',
          fecha: c.fecha,
        }))
      }
      this.cargando = false
    },

    /** Agrega un cuento nuevo al historial y lo persiste. Devuelve su id. */
    async agregar(datos: Omit<Cuento, "id" | "fecha" | "respuesta">): Promise<string> {
      if (!this.usuarioId) return ''

      const { data } = await supabase.from('cuentos').insert({
        usuario_id: this.usuarioId,
        dibujo_data_url: datos.dibujoDataUrl,
        texto: datos.texto,
        pregunta: datos.pregunta,
      }).select('id').single()

      const id = data?.id ?? crypto.randomUUID()
      const nuevo: Cuento = {
        ...datos,
        id,
        fecha: new Date().toISOString(),
        respuesta: "",
      };
      this.cuentos.unshift(nuevo);
      return nuevo.id;
    },

    /** Actualiza la respuesta del nino para un cuento existente. */
    async actualizarRespuesta(id: string, texto: string): Promise<void> {
      const cuento = this.cuentos.find((c) => c.id === id);
      if (cuento) {
        cuento.respuesta = texto;
        await supabase.from('cuentos').update({ respuesta: texto }).eq('id', id)
      }
    },
  },
});
