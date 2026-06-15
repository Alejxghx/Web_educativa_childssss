<script setup lang="ts">
import type { DibujoCargado } from "../types";

const props = defineProps<{
  dibujo: DibujoCargado | null;
  ocupado: boolean;
}>();

const emit = defineEmits<{ cargar: [archivo: File]; generar: [] }>();

function alElegir(evento: Event): void {
  const input = evento.target as HTMLInputElement;
  const archivo = input.files?.[0];
  if (archivo) emit("cargar", archivo);
}
</script>

<template>
  <section class="subida">
    <label class="subida__drop" :class="{ 'subida__drop--con-imagen': props.dibujo }">
      <input
        type="file"
        accept="image/*"
        class="subida__input"
        @change="alElegir"
      />
      <img
        v-if="props.dibujo"
        :src="props.dibujo.dataUrl"
        alt="Vista previa del dibujo"
        class="subida__preview"
      />
      <span v-else class="subida__texto">📷 Toca para subir tu dibujo</span>
    </label>

    <button
      type="button"
      class="btn btn--primario"
      :disabled="!props.dibujo || props.ocupado"
      @click="emit('generar')"
    >
      {{ props.ocupado ? "Generando…" : "✨ Generar cuento" }}
    </button>
  </section>
</template>
