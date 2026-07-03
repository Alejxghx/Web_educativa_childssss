<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHistorialStore } from "../stores/historial";

const route = useRoute();
const historial = useHistorialStore();

// Ruta dinamica: el id del cuento se lee directamente de la URL.
const id = computed(() => route.params.id as string);
const cuento = computed(() => historial.obtenerPorId(id.value));

// Computed "escribible": lee del store y, al escribir, guarda en el store.
// Es el binding de formularios (v-model) conectado al estado global.
const respuesta = computed({
  get: () => cuento.value?.respuesta ?? "",
  set: (texto: string) => {
    if (cuento.value) historial.actualizarRespuesta(id.value, texto);
  },
});
</script>

<template>
  <section class="resultado">
    <p v-if="!cuento" class="resultado__error">
      No encontramos ese cuento.
      <RouterLink to="/historial">Volver al historial</RouterLink>
    </p>

    <div v-else class="cuento">
      <img :src="cuento.dibujoDataUrl" alt="Dibujo original" class="subida__preview" />
      <p class="cuento__texto">{{ cuento.texto }}</p>
      <p class="cuento__pregunta">🤔 {{ cuento.pregunta }}</p>

      <label class="cuento__label" for="respuesta">Tu respuesta:</label>
      <textarea
        id="respuesta"
        v-model="respuesta"
        class="cuento__answer"
        placeholder="Escribe aquí lo que piensas…"
      ></textarea>
      <p v-if="respuesta.trim().length > 0" class="cuento__saved">Guardado ✓</p>

      <RouterLink to="/historial" class="btn">← Volver al historial</RouterLink>
    </div>
  </section>
</template>
