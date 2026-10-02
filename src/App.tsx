/**
 * CARTELERA INDEL - Versión 1.0
 * 
 * Aplicación oficial de comunicación para la comunidad educativa del Instituto (estudiantes, docentes y personal).
 * Resuelve el problema de enterarse de las actividades por rumor mediante una cartelera centralizada y confiable.
 * 
 * Funciones Principales:
 * 1. Publicar un evento (título, fecha, hora, lugar, tipo de actividad).
 * 2. Filtrar eventos por semana o por tipo de actividad.
 * 3. Mostrar recordatorio destacado del evento más próximo en el tiempo.
 */

import React, { useState, useEffect } from 'react';
import { Evento, FiltroSemana, FiltroTipo } from './types';
import { encontrarEventoMasProximo, generarEventosIniciales } from './utils/dateUtils';
import { EventoProximoCard } from './components/EventoProximoCard';
import { FormularioEvento } from './components/FormularioEvento';
import { ListaEventos } from './components/ListaEventos';
import { Plus, Megaphone, School, RefreshCw, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'cartelera_indel_eventos_v1';

export default function App() {
  /**
   * Estado de eventos con persistencia en localStorage.
   * 
   * ¡CUIDADO CON EL ERROR TÍPICO!:
   * Siempre envolver el acceso a localStorage en bloques try/catch.
   * En navegadores con modo incógnito estricto o políticas de cookies bloqueadas,
   * llamar a localStorage.getItem() o setItem() puede lanzar una excepción fatal (SecurityError).
   */
  const [eventos, setEventos] = useState<Evento[]>(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY);
      if (guardados) {
        const parseados = JSON.parse(guardados);
        if (Array.isArray(parseados) && parseados.length > 0) {
          return parseados;
        }
      }
    } catch (e) {
      console.warn('No se pudo acceder a localStorage, usando eventos en memoria:', e);
    }
    // Si es la primera vez o no hay datos, inicializamos con actividades institucionales de prueba
    return generarEventosIniciales();
  });

  // Filtros activos
  const [filtroSemana, setFiltroSemana] = useState<FiltroSemana>('todas');
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos');

  // Control del modal o vista de formulario en móvil
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  // Mensaje temporal de éxito tras publicar
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Guardar en localStorage ante cualquier cambio de eventos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
    } catch (e) {
      console.warn('Error al persistir en localStorage:', e);
    }
  }, [eventos]);

  /**
   * Cálculo del evento más próximo
   * Se recalcula cada vez que la lista de eventos cambie.
   */
  const eventoMasProximo = encontrarEventoMasProximo(eventos);

  /**
   * Publicar un nuevo evento
   */
  const handlePublicarEvento = (nuevoEvento: Evento) => {
    setEventos((anteriores) => [nuevoEvento, ...anteriores]);
    setMostrarFormulario(false);
    setMensajeExito(`¡"${nuevoEvento.titulo}" fue publicado con éxito en la cartelera!`);
    
    // Auto-ocultar notificación tras 4 segundos
    setTimeout(() => {
      setMensajeExito(null);
    }, 4000);
  };

  /**
   * Eliminar un evento
   */
  const handleEliminarEvento = (id: string) => {
    setEventos((anteriores) => anteriores.filter((ev) => ev.id !== id));
  };

  /**
   * Restablecer eventos de prueba
   */
  const handleRestablecerEventos = () => {
    const eventosPorDefecto = generarEventosIniciales();
    setEventos(eventosPorDefecto);
    setFiltroSemana('todas');
    setFiltroTipo('todos');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white pb-16 sm:pb-8">
      {/* Barra Superior / Header móvil y escritorio */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  CARTELERA INDEL
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Comunidad
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Información oficial • Sin rumores
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Publicar Evento</span>
            <span className="sm:hidden">Publicar</span>
          </button>
        </div>
      </header>

      {/* Notificación de éxito */}
      {mensajeExito && (
        <div className="max-w-2xl mx-auto px-4 mt-3 w-full">
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1 font-medium">{mensajeExito}</span>
          </div>
        </div>
      )}

      {/* Contenido Principal (Diseño optimizado para móvil max-w-2xl) */}
      <main className="max-w-2xl w-full mx-auto px-4 py-5 space-y-6 flex-1">
        
        {/* Formulario Desplegable / Modal */}
        {mostrarFormulario && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-200">
            <FormularioEvento
              onPublicar={handlePublicarEvento}
              onCancelar={() => setMostrarFormulario(false)}
            />
          </section>
        )}

        {/* FUNCIÓN 3: Recordatorio del evento más próximo */}
        <section>
          <EventoProximoCard evento={eventoMasProximo} />
        </section>

        {/* FUNCIÓN 1 y 2: Listado y Filtros de Eventos */}
        <ListaEventos
          eventos={eventos}
          idEventoProximo={eventoMasProximo?.id || null}
          filtroSemana={filtroSemana}
          filtroTipo={filtroTipo}
          onCambiarFiltroSemana={setFiltroSemana}
          onCambiarFiltroTipo={setFiltroTipo}
          onEliminarEvento={handleEliminarEvento}
        />

        {/* Pie de herramientas auxiliares */}
        <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Megaphone className="w-3.5 h-3.5 text-neutral-400" />
            <span>{eventos.length} actividades registradas</span>
          </div>

          <button
            type="button"
            onClick={handleRestablecerEventos}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-300 transition-colors"
            title="Recargar actividades institucionales iniciales"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restablecer ejemplos</span>
          </button>
        </div>
      </main>

      {/* Pie de página institucional */}
      <footer className="border-t border-neutral-900 py-4 text-center text-xs text-neutral-400">
        Instituto Nacional de Educación y Liderazgo (INDEL) • Cartelera Digital Oficial
      </footer>
    </div>
  );
}
