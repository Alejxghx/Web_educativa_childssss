<script setup lang="ts">
import { computed, ref } from "vue";
import { useHistorialStore } from "../stores/historial";

const historial = useHistorialStore();

// Filtro de busqueda sobre el historial: estado local + valor derivado.
const busqueda = ref("");

const cuentosFiltrados = computed(() => {
  const termino = busqueda.value.trim().toLowerCase();
  if (!termino) return historial.ordenados;
  return historial.ordenados.filter(
    (c) =>
      c.texto.toLowerCase().includes(termino) ||
      c.pregunta.toLowerCase().includes(termino),
  );
});

function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<template>
  <section class="historial">
    <header class="historial__header">
      <h2>Mis cuentos ({{ historial.total }})</h2>
      <input
        v-model="busqueda"
        type="search"
        class="historial__buscador"
        placeholder="Buscar por palabra…"
      />
    </header>

    <p v-if="historial.total === 0" class="resultado__vacio">
      Todavía no has generado ningún cuento.
      <RouterLink to="/">Sube tu primer dibujo →</RouterLink>
    </p>

    <p v-else-if="cuentosFiltrados.length === 0" class="resultado__vacio">
      No hay cuentos que coincidan con «{{ busqueda }}».
    </p>

    <ul v-else class="historial__lista">
      <li
        v-for="c in cuentosFiltrados"
        :key="c.id"
        class="historial__item"
      >
        <RouterLink :to="`/cuento/${c.id}`" class="historial__link">
          <img :src="c.dibujoDataUrl" alt="" class="historial__miniatura" />
          <div class="historial__info">
            <p class="historial__texto">{{ c.texto.slice(0, 80) }}…</p>
            <p class="historial__meta">
              {{ formatearFecha(c.fecha) }} ·
              {{ c.respuesta ? "Respondido ✓" : "Sin responder" }}
            </p>
          </div>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
