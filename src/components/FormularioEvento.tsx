/**
 * Componente: FormularioEvento
 * 
 * Cumple con el Requisito 1: "Publicar un evento con: título, fecha, hora, lugar y tipo de actividad."
 */

import React, { useState } from 'react';
import { Evento, TipoActividad } from '../types';
import { PlusCircle, Calendar, Clock, MapPin, Tag, Type, X, AlertCircle } from 'lucide-react';

interface FormularioEventoProps {
  onPublicar: (nuevoEvento: Evento) => void;
  onCancelar?: () => void;
}

const TIPOS_ACTIVIDAD: TipoActividad[] = [
  'Académica',
  'Taller',
  'Institucional',
  'Cultural',
  'Deportiva',
];

export const FormularioEvento: React.FC<FormularioEventoProps> = ({ onPublicar, onCancelar }) => {
  // Obtenemos la fecha de hoy en formato YYYY-MM-DD para valor inicial por defecto
  const hoyStr = new Date().toISOString().split('T')[0];

  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState(hoyStr);
  const [hora, setHora] = useState('18:00');
  const [lugar, setLugar] = useState('');
  const [tipoActividad, setTipoActividad] = useState<TipoActividad>('Académica');
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  /**
   * Manejador de publicación
   * 
   * ¡CUIDADO CON EL ERROR TÍPICO!:
   * Siempre llamar a e.preventDefault() para evitar que el navegador recargue la página,
   * lo cual borraría los estados en memoria si aún no están guardados.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorValidacion(null);

    // Validación rigurosa de campos obligatorios
    if (!titulo.trim()) {
      setErrorValidacion('Por favor ingresa el título del evento.');
      return;
    }
    if (!fecha) {
      setErrorValidacion('Por favor selecciona una fecha válida.');
      return;
    }
    if (!hora) {
      setErrorValidacion('Por favor especifica la hora del evento.');
      return;
    }
    if (!lugar.trim()) {
      setErrorValidacion('Por favor indica el lugar o aula donde se desarrollará.');
      return;
    }

    const nuevoEvento: Evento = {
      // Usamos crypto.randomUUID() o fallback timestamp para compatibilidad
      id: typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `evento-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      titulo: titulo.trim(),
      fecha,
      hora,
      lugar: lugar.trim(),
      tipoActividad,
      creadoEn: Date.now(),
    };

    onPublicar(nuevoEvento);

    // Limpiamos los campos luego de publicar exitosamente
    setTitulo('');
    setLugar('');
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 backdrop-blur p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Publicar Nuevo Evento
            </h2>
            <p className="text-xs text-neutral-400">
              Informa a la comunidad educativa para evitar rumores.
            </p>
          </div>
        </div>

        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            title="Cerrar formulario"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {errorValidacion && (
        <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorValidacion}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Título */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-400" />
            Título de la actividad *
          </label>
          <input
            type="text"
            required
            placeholder="Ej: Entrega de Proyectos Finales de Programación"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Fecha y Hora en cuadrícula (responsive móvil) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Fecha *
            </label>
            <input
              type="date"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Hora (24hs) *
            </label>
            <input
              type="time"
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Lugar */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Lugar / Espacio del instituto *
          </label>
          <input
            type="text"
            required
            placeholder="Ej: Aula 14, SUM, Patio de Talleres, Laboratorio B"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Tipo de Actividad */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            Tipo de actividad *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TIPOS_ACTIVIDAD.map((tipo) => {
              const seleccionado = tipoActividad === tipo;
              return (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setTipoActividad(tipo)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                    seleccionado
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                      : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {tipo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="pt-2 flex items-center justify-end gap-3">
          {onCancelar && (
            <button
              type="button"
              onClick={onCancelar}
              className="px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-300 text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-colors"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar en la Cartelera</span>
          </button>
        </div>
      </form>
    </div>
  );
};
