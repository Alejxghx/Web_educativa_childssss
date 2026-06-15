# Módulo de Inglés — DrawTale Edu (Angular)

Módulo individual del **Hito 3** de IS-403 (Aplicaciones para el Cliente Web).
Construido en **Angular 22 + TypeScript** (componentes standalone + signals).

> Estado: módulo funcional — vocabulario con voz + quiz interactivo, compila a producción sin errores.

## Responsabilidad dentro del producto

DrawTale Edu es una plataforma de práctica para niños dividida en tres módulos
(Matemáticas, Lengua con IA, Inglés). Este repositorio contiene **únicamente el
módulo de Inglés**, con dos partes:

1. **Vocabulary by topic**: botones por tema (Animals, Colors, Numbers…). Al
   tocarlos se muestra la palabra y su traducción, se **pronuncia en inglés** con
   la voz del navegador (Web Speech API) y se anima.
2. **Quiz**: preguntas de opción múltiple con feedback inmediato — animación de
   celebración al acertar y de _shake_ al fallar, con marcador de aciertos.

Funciona **de forma aislada** (datos mock en un servicio). En el Hito 4 se
integrará en la contenedora JS pura.

## Cómo ejecutarlo localmente

```bash
npm install
npm start         # ng serve -> http://localhost:4200
npm run build     # ng build -> build de producción en dist/
```

## Estructura

```
src/main.ts                       Bootstrap de Angular
src/app/app.ts                    Componente raíz (composición)
src/app/models/ingles.models.ts   Interfaces
src/app/services/vocabulario.ts   Datos del módulo (inyectable)
src/app/services/voz.ts           Pronunciación (Web Speech API)
src/app/components/vocabulario/   Temas + palabra + voz
src/app/components/quiz/          Quiz con feedback y animaciones
src/styles.css                    Estilos globales
```

## Decisiones técnicas (vs. JavaScript puro)

- **Servicios inyectables (DI)**: `VocabularioService` (datos) y `Voz`
  (pronunciación) se inyectan con `inject()`. En el Hito 2 esto eran variables y
  funciones sueltas dentro de un único `ingles.ts`.
- **Signals** (`signal`, `computed`): el estado del quiz (índice, aciertos,
  feedback) es reactivo; la vista se actualiza sola sin tocar el DOM a mano.
- **Control flow** `@if` / `@for` en las plantillas en vez de `createElement` y
  `append` manuales.
- La animación _shake_ se reinicia recreando el nodo de feedback con una clave
  (`@for` sobre `intentos()`), en lugar del truco de _reflow_ del Hito 2.

## Tecnologías

- Angular 22 (standalone components, signals) + TypeScript
- Web Speech API (`speechSynthesis`) para la pronunciación
