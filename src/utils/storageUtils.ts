/**
 * Utilidades de Persistencia Local (localStorage) y Respaldo para CARTELERA INDEL.
 * 
 * Módulo M2: Gestión de lectura, guardado, borrado y exportación de eventos.
 */

import { Evento } from '../types';
import { generarEventosIniciales } from './dateUtils';

export const STORAGE_KEY = 'cartelera_indel_eventos_v1';

/**
 * 1. GUARDAR: Serializa la lista completa de eventos a JSON y la almacena en localStorage.
 * Incluye tanto eventos futuros como pasados (histórico).
 */
export function guardarEventos(eventos: Evento[]): void {
  try {
    const dataSerializada = JSON.stringify(eventos);
    localStorage.setItem(STORAGE_KEY, dataSerializada);
  } catch (error) {
    console.error('Error al guardar eventos en localStorage:', error);
  }
}

/**
 * 2. LEER: Obtiene y parsea los eventos almacenados.
 * Si no existen datos previos o hay error, inicializa con eventos de ejemplo (futuros e históricos).
 */
export function cargarEventos(): Evento[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parseados = JSON.parse(data);
      if (Array.isArray(parseados) && parseados.length > 0) {
        return parseados;
      }
    }
  } catch (error) {
    console.error('Error al leer eventos de localStorage:', error);
  }

  // Carga inicial con eventos de ejemplo si es la primera vez
  const iniciales = generarEventosIniciales();
  guardarEventos(iniciales);
  return iniciales;
}

/**
 * 3. BORRAR: Limpia los eventos del localStorage.
 */
export function borrarEventos(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error al borrar eventos de localStorage:', error);
  }
}

/**
 * 4. EXPORTAR: Genera un archivo .json descargable con todos los eventos para respaldo.
 */
export function exportarEventosAJson(eventos: Evento[]): void {
  try {
    const jsonStr = JSON.stringify(eventos, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Crear enlace temporal de descarga
    const fechaHoy = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.href = url;
    link.download = `cartelera-indel-respaldo-${fechaHoy}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al exportar eventos:', error);
  }
}
