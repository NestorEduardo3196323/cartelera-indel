/**
 * Componente: EventoProximoCard
 * 
 * Cumple con el Requisito 3: "Mostrar un recordatorio del evento más próximo 
 * (el siguiente evento futuro según fecha y hora)."
 */

import React from 'react';
import { Evento } from '../types';
import { formatearFechaLegible, obtenerTextoRelativo } from '../utils/dateUtils';
import { Bell, Calendar, Clock, MapPin, Tag, Sparkles } from 'lucide-react';

interface EventoProximoCardProps {
  evento: Evento | null;
}

/**
 * Mapeo de colores y estilos por tipo de actividad
 */
const estilosPorTipo: Record<string, { bg: string; text: string; border: string }> = {
  'Académica': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Taller': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Institucional': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Cultural': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Deportiva': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
};

export const EventoProximoCard: React.FC<EventoProximoCardProps> = ({ evento }) => {
  if (!evento) {
    return (
      <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 text-center">
        <div className="inline-flex p-3 rounded-full bg-neutral-800 text-neutral-400 mb-2">
          <Bell className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold text-neutral-300">
          No hay actividades próximas registradas
        </h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
          Publica un nuevo evento para que aparezca aquí como recordatorio destacado para toda la institución.
        </p>
      </div>
    );
  }

  const estiloTipo = estilosPorTipo[evento.tipoActividad] || {
    bg: 'bg-neutral-800',
    text: 'text-neutral-300',
    border: 'border-neutral-700',
  };

  const textoTiempoRelativo = obtenerTextoRelativo(evento.fecha, evento.hora);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 via-neutral-900 to-neutral-900 border-2 border-indigo-500/40 p-5 shadow-xl shadow-indigo-950/30 transition-all">
      {/* Luz ambiental sutil */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Cabecera del recordatorio */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5" />
            Recordatorio: Siguiente evento institucional
          </span>
        </div>

        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${estiloTipo.bg} ${estiloTipo.text} ${estiloTipo.border}`}>
          {evento.tipoActividad}
        </span>
      </div>

      {/* Título principal */}
      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
        {evento.titulo}
      </h2>

      {/* Tiempo relativo destacado */}
      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>{textoTiempoRelativo}</span>
      </div>

      {/* Metadatos (Fecha, Hora, Lugar) */}
      <div className="mt-4 pt-3 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
          <span className="capitalize">{formatearFechaLegible(evento.fecha)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
          <span>{evento.hora} hs</span>
        </div>

        <div className="flex items-center gap-2 sm:col-span-2 text-neutral-300">
          <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="font-medium text-white">{evento.lugar}</span>
        </div>
      </div>
    </div>
  );
};
