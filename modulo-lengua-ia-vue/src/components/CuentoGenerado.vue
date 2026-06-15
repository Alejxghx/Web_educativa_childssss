<script setup lang="ts">
import type { CuentoIA, EstadoLengua } from "../types";

defineProps<{
  estado: EstadoLengua;
  cuento: CuentoIA | null;
  error: string;
  mensajeLoader: string;
  respuesta: string;
  guardado: boolean;
}>();

const emit = defineEmits<{ responder: [texto: string] }>();

function alEscribir(evento: Event): void {
  emit("responder", (evento.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <section class="resultado">
    <p
      v-if="estado === 'inicial' || estado === 'listo'"
      class="resultado__vacio"
    >
      Aquí aparecerá tu cuento cuando subas un dibujo y pulses «Generar».
    </p>

    <div v-else-if="estado === 'generando'" class="loader">
      <span class="loader__spinner" aria-hidden="true"></span>
      <p class="loader__msg">{{ mensajeLoader }}</p>
    </div>

    <p v-else-if="estado === 'error'" class="resultado__error">⚠ {{ error }}</p>

    <div v-else-if="estado === 'completo' && cuento" class="cuento">
      <p class="cuento__texto">{{ cuento.cuento }}</p>
      <p class="cuento__pregunta">🤔 {{ cuento.pregunta }}</p>

      <label class="cuento__label" for="respuesta">Tu respuesta:</label>
      <textarea
        id="respuesta"
        class="cuento__answer"
        :value="respuesta"
        placeholder="Escribe aquí lo que piensas…"
        @input="alEscribir"
      ></textarea>
      <p v-if="guardado" class="cuento__saved">Guardado ✓</p>
    </div>
  </section>
</template>
