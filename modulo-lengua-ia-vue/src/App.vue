<script setup lang="ts">
import PasosProgreso from "./components/PasosProgreso.vue";
import SubidaDibujo from "./components/SubidaDibujo.vue";
import CuentoGenerado from "./components/CuentoGenerado.vue";
import { useLenguaIA } from "./composables/useLenguaIA";

const {
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
} = useLenguaIA();
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

    <PasosProgreso :paso="paso" />

    <div class="panel">
      <SubidaDibujo
        :dibujo="dibujo"
        :ocupado="estado === 'generando'"
        @cargar="cargarDibujo"
        @generar="generar"
      />
      <CuentoGenerado
        :estado="estado"
        :cuento="cuento"
        :error="error"
        :mensaje-loader="mensajeLoader"
        :respuesta="respuesta"
        :guardado="guardado"
        @responder="guardarRespuesta"
      />
    </div>

    <footer class="app__footer">
      Módulo de Lengua con IA · Hito 3 · Vue 3 + Vite + TypeScript
    </footer>
  </main>
</template>
