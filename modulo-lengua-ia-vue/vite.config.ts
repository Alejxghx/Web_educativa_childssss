import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// base "./" => build con rutas relativas, listo para integrarse como widget
// dentro de la contenedora JS pura del Hito 4.
export default defineConfig({
  plugins: [vue()],
  base: "/vue/",
});
