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
import { encontrarEventoMasProximo } from './utils/dateUtils';
import { 
  cargarEventos, 
  guardarEventos, 
  exportarEventosAJson, 
  borrarEventos 
} from './utils/storageUtils';
import { EventoProximoCard } from './components/EventoProximoCard';
import { FormularioEvento } from './components/FormularioEvento';
import { ListaEventos } from './components/ListaEventos';
import { Plus, Megaphone, School, RefreshCw, CheckCircle2, Download } from 'lucide-react';

export default function App() {
  /**
   * Estado de eventos con persistencia en localStorage a través de storageUtils.
   * Inicializa leyendo el almacenamiento local y asegurando eventos iniciales si está vacío.
   */
  const [eventos, setEventos] = useState<Evento[]>(() => cargarEventos());

  // Filtros activos
  const [filtroSemana, setFiltroSemana] = useState<FiltroSemana>('todas');
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos');

  // Control del modal o vista de formulario en móvil
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  // Mensaje temporal de éxito tras publicar o exportar
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Sincronizar automáticamente en localStorage cada vez que la lista cambie
  useEffect(() => {
    guardarEventos(eventos);
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
    borrarEventos();
    const cargados = cargarEventos();
    setEventos(cargados);
    setFiltroSemana('todas');
    setFiltroTipo('todos');
    setMensajeExito('Eventos iniciales restablecidos correctamente.');
    setTimeout(() => setMensajeExito(null), 3000);
  };

  /**
   * Exportar respaldo a archivo .json
   */
  const handleExportarRespaldo = () => {
    exportarEventosAJson(eventos);
    setMensajeExito('Respaldo descargado: cartelera-indel-respaldo.json');
    setTimeout(() => setMensajeExito(null), 4000);
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
        <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Megaphone className="w-3.5 h-3.5 text-neutral-400" />
            <span>{eventos.length} actividades registradas</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportarRespaldo}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-[11px] font-medium transition-colors"
              title="Descargar respaldo de los eventos en formato JSON"
            >
              <Download className="w-3 h-3 text-indigo-400" />
              <span>Exportar respaldo (.json)</span>
            </button>

            <button
              type="button"
              onClick={handleRestablecerEventos}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-neutral-400 hover:text-neutral-200 transition-colors"
              title="Recargar actividades institucionales iniciales"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          </div>
        </div>
      </main>

      {/* Pie de página institucional */}
      <footer className="border-t border-neutral-900 py-4 text-center text-xs text-neutral-400">
        Instituto Nacional de Educación y Liderazgo (INDEL) • Cartelera Digital Oficial
      </footer>
    </div>
  );
}
