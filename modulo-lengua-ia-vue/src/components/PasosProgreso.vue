<script setup lang="ts">
defineProps<{ paso: number }>();

const pasos = [
  { n: 1, label: "Sube tu dibujo" },
  { n: 2, label: "La IA crea el cuento" },
  { n: 3, label: "Responde la pregunta" },
];
</script>

<template>
  <ol class="pasos">
    <li
      v-for="p in pasos"
      :key="p.n"
      class="pasos__item"
      :data-state="p.n < paso ? 'done' : p.n === paso ? 'active' : 'idle'"
    >
      <span class="pasos__num">{{ p.n < paso ? "✓" : p.n }}</span>
      <span class="pasos__label">{{ p.label }}</span>
    </li>
  </ol>
</template>
