/**
 * Componente: ListaEventos
 * 
 * Cumple con el Requisito 2: "Filtrar la lista de eventos por semana o por tipo de actividad."
 */

import React from 'react';
import { Evento, FiltroSemana, FiltroTipo, TipoActividad } from '../types';
import { estaEnFiltroSemana, formatearFechaLegible, parsearFechaHora } from '../utils/dateUtils';
import { Calendar, Clock, MapPin, Filter, Layers, Trash2, CalendarDays } from 'lucide-react';

interface ListaEventosProps {
  eventos: Evento[];
  idEventoProximo: string | null;
  filtroSemana: FiltroSemana;
  filtroTipo: FiltroTipo;
  onCambiarFiltroSemana: (semana: FiltroSemana) => void;
  onCambiarFiltroTipo: (tipo: FiltroTipo) => void;
  onEliminarEvento?: (id: string) => void;
}

const OPCIONES_TIPO: { valor: FiltroTipo; etiqueta: string }[] = [
  { valor: 'todos', etiqueta: 'Todas las actividades' },
  { valor: 'Académica', etiqueta: 'Académica' },
  { valor: 'Taller', etiqueta: 'Taller' },
  { valor: 'Institucional', etiqueta: 'Institucional' },
  { valor: 'Cultural', etiqueta: 'Cultural' },
  { valor: 'Deportiva', etiqueta: 'Deportiva' },
];

const OPCIONES_SEMANA: { valor: FiltroSemana; etiqueta: string }[] = [
  { valor: 'todas', etiqueta: 'Todas las fechas' },
  { valor: 'esta_semana', etiqueta: 'Esta semana' },
  { valor: 'proxima_semana', etiqueta: 'Próxima semana' },
];

const estilosPorTipo: Record<string, { bg: string; text: string; border: string }> = {
  'Académica': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Taller': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Institucional': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Cultural': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Deportiva': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
};

export const ListaEventos: React.FC<ListaEventosProps> = ({
  eventos,
  idEventoProximo,
  filtroSemana,
  filtroTipo,
  onCambiarFiltroSemana,
  onCambiarFiltroTipo,
  onEliminarEvento,
}) => {
  /**
   * Aplicación combinada de los filtros:
   * 1. Por semana (esta_semana, proxima_semana, o todas)
   * 2. Por tipo de actividad (Académica, Taller, etc., o todos)
   */
  const eventosFiltrados = eventos.filter((ev) => {
    const coincideSemana = estaEnFiltroSemana(ev, filtroSemana);
    const coincideTipo = filtroTipo === 'todos' || ev.tipoActividad === filtroTipo;
    return coincideSemana && coincideTipo;
  });

  /**
   * Orden cronológico:
   * Siempre mostramos los eventos ordenados por fecha y hora ascendente
   * para que la lectura sea natural en el calendario del instituto.
   */
  const eventosOrdenados = [...eventosFiltrados].sort((a, b) => {
    const timeA = parsearFechaHora(a.fecha, a.hora).getTime();
    const timeB = parsearFechaHora(b.fecha, b.hora).getTime();
    return timeA - timeB;
  });

  return (
    <section className="space-y-4">
      {/* Barra de Filtros (Responsive para pantallas móviles) */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            Filtrar actividades
          </span>
          <span className="text-neutral-400">
            {eventosOrdenados.length} {eventosOrdenados.length === 1 ? 'evento' : 'eventos'}
          </span>
        </div>

        {/* Filtro 1: Por semana */}
        <div className="space-y-1.5">
          <label className="text-xs text-neutral-400 flex items-center gap-1">
            <CalendarDays className="w-3 h-3 text-indigo-400" />
            Por período / semana:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {OPCIONES_SEMANA.map((opcion) => {
              const activo = filtroSemana === opcion.valor;
              return (
                <button
                  key={opcion.valor}
                  type="button"
                  onClick={() => onCambiarFiltroSemana(opcion.valor)}
                  className={`py-2 px-2 text-center rounded-xl text-xs font-semibold transition-all ${
                    activo
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {opcion.etiqueta}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtro 2: Por tipo de actividad */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs text-neutral-400 flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-400" />
            Por tipo de actividad:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {OPCIONES_TIPO.map((opcion) => {
              const activo = filtroTipo === opcion.valor;
              return (
                <button
                  key={opcion.valor}
                  type="button"
                  onClick={() => onCambiarFiltroTipo(opcion.valor)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activo
                      ? 'bg-neutral-100 text-neutral-950 font-bold shadow'
                      : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                  }`}
                >
                  {opcion.etiqueta}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista de Eventos */}
      {eventosOrdenados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-800 p-8 text-center bg-neutral-900/20">
          <Calendar className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-neutral-300">
            No se encontraron eventos con los filtros seleccionados
          </p>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
            Prueba cambiando la semana o seleccionando "Todas las actividades".
          </p>
          {(filtroSemana !== 'todas' || filtroTipo !== 'todos') && (
            <button
              onClick={() => {
                onCambiarFiltroSemana('todas');
                onCambiarFiltroTipo('todos');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-colors"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {eventosOrdenados.map((ev) => {
            const esProximo = ev.id === idEventoProximo;
            const estiloTipo = estilosPorTipo[ev.tipoActividad] || {
              bg: 'bg-neutral-800',
              text: 'text-neutral-300',
              border: 'border-neutral-700',
            };

            return (
              <article
                key={ev.id}
                className={`relative rounded-2xl border transition-all p-4 sm:p-5 flex flex-col justify-between gap-3 ${
                  esProximo
                    ? 'bg-neutral-900/90 border-indigo-500/50 shadow-lg shadow-indigo-950/20 ring-1 ring-indigo-500/30'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/70'
                }`}
              >
                {/* Cabecera de la tarjeta */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${estiloTipo.bg} ${estiloTipo.text} ${estiloTipo.border}`}>
                        {ev.tipoActividad}
                      </span>

                      {esProximo && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                          ★ Próximo en la agenda
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug pt-1">
                      {ev.titulo}
                    </h3>
                  </div>

                  {onEliminarEvento && (
                    <button
                      type="button"
                      onClick={() => onEliminarEvento(ev.id)}
                      className="text-neutral-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
                      title="Eliminar evento"
                      aria-label="Eliminar evento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Detalles: Fecha, Hora y Lugar */}
                <div className="pt-2 border-t border-neutral-800/60 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="capitalize">{formatearFechaLegible(ev.fecha)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{ev.hora} hs</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-neutral-200">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="font-medium">{ev.lugar}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
