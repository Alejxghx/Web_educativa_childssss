import { createRouter, createWebHistory } from "vue-router";
import GenerarView from "../views/GenerarView.vue";
import HistorialView from "../views/HistorialView.vue";
import DetalleCuentoView from "../views/DetalleCuentoView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "generar",
      component: GenerarView,
    },
    {
      path: "/historial",
      name: "historial",
      component: HistorialView,
    },
    {
      // Ruta dinamica: el detalle lee el id del cuento desde la URL,
      // no por props ni por estado global.
      path: "/cuento/:id",
      name: "detalle-cuento",
      component: DetalleCuentoView,
    },
  ],
});

export default router;
