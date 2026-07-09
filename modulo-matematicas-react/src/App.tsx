import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DetalleActividadView from "./views/DetalleActividadView";
import InicioView from "./views/InicioView";
import ProgresoView from "./views/ProgresoView";
import RetoView from "./views/RetoView";

/** Composicion navegable del modulo de Matematicas. */
export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="DrawTale">
          <span className="brand__mark">✓</span>
          <span>DrawTale</span>
        </div>
        <Navbar />
        <div className="topbar__tools" aria-label="Herramientas">
          <span>◎</span>
          <span>⚙</span>
        </div>
      </header>

      <main className="app">
        <Routes>
          <Route path="/" element={<InicioView />} />
          <Route path="/reto" element={<RetoView />} />
          <Route path="/progreso" element={<ProgresoView />} />
          <Route path="/actividades/:id" element={<DetalleActividadView />} />
        </Routes>
      </main>

      <footer className="app__footer">
        <strong>DrawTale</strong>
        <span>Modulo de Matematicas - React + Vite + TypeScript</span>
      </footer>
    </div>
  );
}
