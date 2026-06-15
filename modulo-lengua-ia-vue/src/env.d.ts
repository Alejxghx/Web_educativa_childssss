/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API key de Groq, inyectada desde el archivo .env (no versionado). */
  readonly VITE_GROQ_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
