import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav" aria-label="Navegacion principal">
      <NavLink to="/" end>
        Practica
      </NavLink>
      <NavLink to="/reto">Desafio</NavLink>
      <NavLink to="/progreso">Logros</NavLink>
    </nav>
  );
}
