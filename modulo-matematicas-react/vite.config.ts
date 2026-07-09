import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Config base de Vite para el modulo de Matematicas.
// base "./" => el build sirve con rutas relativas, listo para integrarse
// como widget dentro de la contenedora JS pura del Hito 4.
export default defineConfig({
  plugins: [react()],
  base: "/react/",
});
