import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { MatematicasProvider } from "./context/MatematicasContext";
import "./styles/app.css";

const contenedor = document.getElementById("root");
if (!contenedor) {
  throw new Error("No se encontro el nodo #root en index.html");
}

createRoot(contenedor).render(
  <StrictMode>
    <HashRouter>
      <MatematicasProvider>
        <App />
      </MatematicasProvider>
    </HashRouter>
  </StrictMode>,
);
