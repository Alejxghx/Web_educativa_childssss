<script setup lang="ts">
import { useRouter } from "vue-router";
import PasosProgreso from "../components/PasosProgreso.vue";
import SubidaDibujo from "../components/SubidaDibujo.vue";
import CuentoGenerado from "../components/CuentoGenerado.vue";
import { useLenguaIA } from "../composables/useLenguaIA";
import { useHistorialStore } from "../stores/historial";

const router = useRouter();
const historial = useHistorialStore();

const {
  estado,
  dibujo,
  cuento,
  error,
  mensajeLoader,
  paso,
  cargarDibujo,
  generar,
} = useLenguaIA();

/** Guarda el cuento en el historial global y navega a su pantalla de detalle. */
function guardarYContinuar(): void {
  if (!cuento.value || !dibujo.value) return;

  const id = historial.agregar({
    dibujoDataUrl: dibujo.value.dataUrl,
    texto: cuento.value.cuento,
    pregunta: cuento.value.pregunta,
  });

  // Navegacion por codigo hacia la ruta dinamica /cuento/:id
  router.push(`/cuento/${id}`);
}
</script>

<template>
  <section>
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
        @guardar="guardarYContinuar"
      />
    </div>
  </section>
</template>
