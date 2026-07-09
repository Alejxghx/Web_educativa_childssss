<script setup lang="ts">
import { onMounted } from "vue";
import { useHistorialStore } from "./stores/historial";

const historial = useHistorialStore();

onMounted(() => { historial.iniciar() })
</script>

<template>
  <main class="app">
    <header class="app__header">
      <p class="app__kicker">DrawTale Edu</p>
      <h1 class="app__titulo">Lengua con IA</h1>
      <p class="app__sub">
        Sube un dibujo y la IA escribe un cuento inspirado en él.
      </p>
    </header>

    <nav class="navbar">
      <RouterLink to="/" class="navbar__link">✨ Generar cuento</RouterLink>
      <RouterLink to="/historial" class="navbar__link">📚 Mi historial</RouterLink>
    </nav>

    <RouterView />

    <footer class="app__footer">
      Módulo de Lengua con IA · Hito 3 · Vue 3 + Vite + TypeScript
    </footer>
  </main>
</template>
