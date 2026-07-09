import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ActividadEducativa, ProgresoActividad } from "../types";
import { supabase } from "../lib/supabase";

interface MatematicasContextValue {
  actividades: ActividadEducativa[];
  filtro: string;
  actividadesFiltradas: ActividadEducativa[];
  progreso: ProgresoActividad[];
  totalPuntos: number;
  setFiltro: (valor: string) => void;
  buscarActividad: (id: string) => ActividadEducativa | undefined;
  registrarPractica: (actividadId: string) => void;
}

const MatematicasContext = createContext<MatematicasContextValue | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export function MatematicasProvider({ children }: Props) {
  const [actividades, setActividades] = useState<ActividadEducativa[]>([]);
  const [filtro, setFiltro] = useState("");
  const [progreso, setProgreso] = useState<ProgresoActividad[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (!user) {
        window.location.href = '/'
        return
      }
      setUsuarioId(user.id)
    })
  }, [])

  useEffect(() => {
    if (!usuarioId) return

    Promise.all([
      supabase.from('actividades').select('*'),
      supabase.from('progreso_actividades').select('*').eq('usuario_id', usuarioId),
    ]).then(([actividadesRes, progresoRes]) => {
      if (actividadesRes.data) setActividades(actividadesRes.data)
      if (progresoRes.data) {
        setProgreso(progresoRes.data.map((p) => ({
          actividadId: p.actividad_id,
          practicada: p.practicada,
          intentos: p.intentos,
        })))
      }
    })
  }, [usuarioId])

  const actividadesFiltradas = useMemo(() => {
    const texto = filtro.trim().toLowerCase();
    if (!texto) return actividades;
    return actividades.filter((actividad) =>
      `${actividad.titulo} ${actividad.descripcion} ${actividad.nivel}`
        .toLowerCase()
        .includes(texto),
    );
  }, [actividades, filtro]);

  const totalPuntos = useMemo(() => {
    return progreso.reduce((total, item) => {
      const actividad = actividades.find(
        (actual) => actual.id === item.actividadId,
      );
      return total + (item.practicada ? actividad?.puntos ?? 0 : 0);
    }, 0);
  }, [actividades, progreso]);

  function buscarActividad(id: string) {
    return actividades.find((actividad) => actividad.id === id);
  }

  async function registrarPractica(actividadId: string) {
    if (!usuarioId) return

    const existe = progreso.find((item) => item.actividadId === actividadId);
    const nuevosIntentos = existe ? existe.intentos + 1 : 1;
    const nuevoItem: ProgresoActividad = {
      actividadId,
      practicada: true,
      intentos: nuevosIntentos,
    };

    await supabase.from('progreso_actividades').upsert({
      usuario_id: usuarioId,
      actividad_id: actividadId,
      practicada: true,
      intentos: nuevosIntentos,
    }, { onConflict: 'usuario_id, actividad_id' })

    setProgreso(existe
      ? progreso.map((item) =>
          item.actividadId === actividadId ? nuevoItem : item,
        )
      : [nuevoItem, ...progreso],
    )
  }

  const value = {
    actividades,
    filtro,
    actividadesFiltradas,
    progreso,
    totalPuntos,
    setFiltro,
    buscarActividad,
    registrarPractica,
  };

  return (
    <MatematicasContext.Provider value={value}>
      {children}
    </MatematicasContext.Provider>
  );
}

export function useMatematicas() {
  const context = useContext(MatematicasContext);
  if (!context) {
    throw new Error("useMatematicas debe usarse dentro de MatematicasProvider");
  }
  return context;
}
