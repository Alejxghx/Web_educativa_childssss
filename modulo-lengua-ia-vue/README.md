# Módulo de Lengua con IA — DrawTale Edu (Vue)

Módulo individual del **Hito 3** de IS-403 (Aplicaciones para el Cliente Web).
Construido en **Vue 3 + Vite + TypeScript**.

> Estado: módulo funcional — flujo completo subir → generar → responder, compila a producción sin errores.

## Responsabilidad dentro del producto

DrawTale Edu es una plataforma de práctica para niños dividida en tres módulos
(Matemáticas, Lengua con IA, Inglés). Este repositorio contiene **únicamente el
módulo de Lengua con IA**: el niño **sube un dibujo**, la **IA (Groq Vision)**
escribe un cuento corto inspirado en él más una pregunta de comprensión lectora,
y el niño **responde** (la respuesta se guarda en `localStorage`).

Funciona **de forma aislada**. En el Hito 4 se integrará en la contenedora JS
pura y compartirá backend con los otros módulos.

## Configuración de la API key

```bash
cp .env.example .env      # crea tu archivo .env
# edita .env y pega tu key de https://console.groq.com/keys
```

El archivo `.env` está en `.gitignore`: la key **nunca** se sube al repo.

## Cómo ejecutarlo localmente

```bash
npm install
npm run dev       # servidor de desarrollo (Vite)
npm run build     # type-check (vue-tsc) + build de producción a dist/
npm run preview   # sirve el build de producción
```

## Estructura

```
src/main.ts                    Bootstrap de Vue
src/App.vue                    Composición de la pantalla
src/types.ts                   Interfaces compartidas
src/lib/groq.ts                Servicio de la API de Groq Vision
src/composables/useLenguaIA.ts Estado del flujo (equivalente a un hook)
src/components/                UI (pasos, subida, cuento)
src/styles/app.css             Estilos
```

## Cómo funciona el flujo

1. El niño **sube un dibujo** → se muestra la vista previa y el paso 1 se completa.
2. Pulsa **«Generar cuento»** → el dibujo se envía a Groq Vision (paso 2, con
   loader animado).
3. La IA devuelve un **cuento + una pregunta** de comprensión (paso 3).
4. El niño **escribe su respuesta**, que se guarda en `localStorage` (persiste).

## Decisiones técnicas (vs. JavaScript puro)

- **Servicio aislado** en `lib/groq.ts`: la llamada a la IA no sabe nada de la UI.
- **Estado reactivo en un composable** (`useLenguaIA`): `ref`/`computed` sustituyen
  al manejo manual de `hidden`, `dataset` y variables sueltas del Hito 2. El paso
  visible es un `computed` derivado del estado, no se actualiza a mano.
- **Componentes con props/eventos tipados** (`<script setup>` + `defineProps`/
  `defineEmits`): la UI es declarativa y cada pieza es independiente.

En el Hito 2 todo esto era un único `lengua.ts` manipulando el DOM con `$(...)`.
Aquí Vue reacciona al estado y re-renderiza solo lo necesario.

## Tecnologías

- Vue 3 (Composition API, `<script setup>`) + TypeScript (modo strict)
- Vite 6 como bundler y dev server
- Groq Vision (Llama 4 Scout) para la generación del cuento
