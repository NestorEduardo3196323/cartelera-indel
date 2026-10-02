/**
 * Utilidades para manejo seguro de fechas y horas en Cartelera INDEL.
 * 
 * NOTA PARA DESARROLLADORES:
 * En JavaScript, el manejo de fechas puede ser engañoso si se usan cadenas como `new Date("2026-10-02")`.
 * Dicha sintaxis se interpreta como medianoche en UTC (Tiempo Universal Coordinado), lo que en zonas
 * horarias de América (como GMT-3, GMT-5) causa que el evento se desplace al día anterior.
 * Las funciones a continuación evitan ese error parseando los componentes en hora local.
 */

import { Evento, FiltroSemana } from '../types';

/**
 * Convierte 'YYYY-MM-DD' y 'HH:mm' en una instancia segura de Date en la zona horaria local.
 * 
 * ¡CUIDADO CON EL ERROR TÍPICO!:
 * El mes en `new Date(año, mes, día)` es base 0 (Enero = 0, Diciembre = 11).
 * Por eso se debe restar 1 a `partesFecha[1]`.
 */
export function parsearFechaHora(fechaStr: string, horaStr: string): Date {
  const [año, mes, dia] = fechaStr.split('-').map(Number);
  const [horas, minutos] = (horaStr || '00:00').split(':').map(Number);

  // Creamos la fecha directamente con componentes locales para evitar desfases UTC
  return new Date(año, mes - 1, dia, horas || 0, minutos || 0, 0, 0);
}

/**
 * Obtiene el rango de fechas [inicio, fin] de la semana deseada.
 * La semana educativa se considera de Lunes (00:00:00) a Domingo (23:59:59).
 * 
 * ¡CUIDADO CON EL ERROR TÍPICO EN getDay()!:
 * En JS, `Date.prototype.getDay()` devuelve 0 para el DOMINGO y 1 para el LUNES.
 * Si no convertimos el domingo a 7, el cálculo de "inicio de semana" (restar días)
 * se romperá los domingos, calculando la semana equivocada.
 */
export function obtenerRangoSemana(tipo: 'esta_semana' | 'proxima_semana'): { inicio: Date; fin: Date } {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  
  // Normalizamos para que Lunes sea 1 y Domingo sea 7
  const diaNormalizado = diaSemana === 0 ? 7 : diaSemana;
  
  // Calculamos el Lunes de la semana actual
  const lunesActual = new Date(hoy);
  lunesActual.setDate(hoy.getDate() - (diaNormalizado - 1));
  lunesActual.setHours(0, 0, 0, 0);

  if (tipo === 'esta_semana') {
    const domingoActual = new Date(lunesActual);
    domingoActual.setDate(lunesActual.getDate() + 6);
    domingoActual.setHours(23, 59, 59, 999);
    return { inicio: lunesActual, fin: domingoActual };
  } else {
    // Próxima semana: 7 días después del lunes actual
    const lunesProximo = new Date(lunesActual);
    lunesProximo.setDate(lunesActual.getDate() + 7);
    lunesProximo.setHours(0, 0, 0, 0);

    const domingoProximo = new Date(lunesProximo);
    domingoProximo.setDate(lunesProximo.getDate() + 6);
    domingoProximo.setHours(23, 59, 59, 999);
    return { inicio: lunesProximo, fin: domingoProximo };
  }
}

/**
 * Comprueba si un evento cae dentro del filtro de semana seleccionado.
 */
export function estaEnFiltroSemana(evento: Evento, filtro: FiltroSemana): boolean {
  if (filtro === 'todas') return true;

  const fechaEvento = parsearFechaHora(evento.fecha, evento.hora);
  const { inicio, fin } = obtenerRangoSemana(filtro);

  return fechaEvento.getTime() >= inicio.getTime() && fechaEvento.getTime() <= fin.getTime();
}

/**
 * Encuentra el evento más próximo en el futuro respecto al momento actual.
 * 
 * ¡CUIDADO CON EL ERROR TÍPICO!:
 * Se debe comparar la fecha Y hora exactas contra `Date.now()`. Si solo se compara
 * la fecha `YYYY-MM-DD`, un evento programado para las 18:00 de hoy podría descartarse
 * prematuramente por la mañana, o considerarse "futuro" cuando ya pasó hace dos horas.
 */
export function encontrarEventoMasProximo(eventos: Evento[]): Evento | null {
  const ahora = new Date().getTime();

  // Filtramos solo los eventos cuya fecha y hora sean mayores o iguales al momento actual
  const eventosFuturos = eventos.filter((ev) => {
    const timestampEvento = parsearFechaHora(ev.fecha, ev.hora).getTime();
    return timestampEvento >= ahora;
  });

  if (eventosFuturos.length === 0) return null;

  // Ordenamos de menor a mayor timestamp (el más cercano al presente primero)
  eventosFuturos.sort((a, b) => {
    const tA = parsearFechaHora(a.fecha, a.hora).getTime();
    const tB = parsearFechaHora(b.fecha, b.hora).getTime();
    return tA - tB;
  });

  return eventosFuturos[0];
}

/**
 * Formatea una fecha de evento en formato amigable y formal en español:
 * ej. "Viernes 2 de octubre, 2026"
 */
export function formatearFechaLegible(fechaStr: string): string {
  if (!fechaStr) return '';
  const [año, mes, dia] = fechaStr.split('-').map(Number);
  const fecha = new Date(año, mes - 1, dia);

  return fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Calcula un texto humano relativo para el recordatorio
 * ej: "Hoy a las 15:00", "Mañana a las 10:30", "En 3 días (Viernes)"
 */
export function obtenerTextoRelativo(fechaStr: string, horaStr: string): string {
  const fechaEvento = parsearFechaHora(fechaStr, horaStr);
  const ahora = new Date();
  
  const diferenciaMs = fechaEvento.getTime() - ahora.getTime();
  if (diferenciaMs < 0) return 'El evento ya comenzó';

  const horasFaltantes = Math.floor(diferenciaMs / (1000 * 60 * 60));
  const diasFaltantes = Math.floor(horasFaltantes / 24);

  // Mismo día calendario
  const esMismoDia = 
    fechaEvento.getDate() === ahora.getDate() &&
    fechaEvento.getMonth() === ahora.getMonth() &&
    fechaEvento.getFullYear() === ahora.getFullYear();

  if (esMismoDia) {
    if (horasFaltantes === 0) {
      const minutosFaltantes = Math.floor(diferenciaMs / (1000 * 60));
      return `¡Comienza en ${minutosFaltantes} minutos! (Hoy a las ${horaStr} hs)`;
    }
    return `Hoy a las ${horaStr} hs (en ${horasFaltantes} h)`;
  }

  // Mañana
  const mañana = new Date(ahora);
  mañana.setDate(ahora.getDate() + 1);
  const esMañana = 
    fechaEvento.getDate() === mañana.getDate() &&
    fechaEvento.getMonth() === mañana.getMonth() &&
    fechaEvento.getFullYear() === mañana.getFullYear();

  if (esMañana) {
    return `Mañana a las ${horaStr} hs`;
  }

  if (diasFaltantes < 7) {
    const diaSemana = fechaEvento.toLocaleDateString('es-ES', { weekday: 'long' });
    return `En ${diasFaltantes} días (${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)} a las ${horaStr} hs)`;
  }

  return `En ${diasFaltantes} días (el ${formatearFechaLegible(fechaStr)})`;
}

/**
 * Genera eventos de ejemplo relativos a la fecha actual para que la cartelera
 * nunca inicie vacía en la primera prueba y el usuario pueda validar los filtros de inmediato.
 */
export function generarEventosIniciales(): Evento[] {
  const hoy = new Date();

  // Función interna para sumar días y formatear a YYYY-MM-DD
  const formatYMD = (diasOffset: number): string => {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + diasOffset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return [
    {
      id: 'demo-1',
      titulo: 'Mesa de Exámenes Finales y Recuperatorios',
      fecha: formatYMD(1), // Mañana
      hora: '10:00',
      lugar: 'Aula Magna - Sede Central',
      tipoActividad: 'Académica',
      creadoEn: Date.now() - 3600000 * 24,
    },
    {
      id: 'demo-2',
      titulo: 'Taller de Práctica Profesionalizante y Robótica',
      fecha: formatYMD(3), // En 3 días (esta semana)
      hora: '14:30',
      lugar: 'Laboratorio de Informática 2',
      tipoActividad: 'Taller',
      creadoEn: Date.now() - 3600000 * 12,
    },
    {
      id: 'demo-3',
      titulo: 'Reunión General del Claustro Docente y Directivos',
      fecha: formatYMD(8), // Próxima semana
      hora: '18:00',
      lugar: 'Sala de Conferencias - 1er Piso',
      tipoActividad: 'Institucional',
      creadoEn: Date.now() - 3600000 * 5,
    },
    {
      id: 'demo-4',
      titulo: 'Torneo Intercolegial de Vóley y Ajedrez',
      fecha: formatYMD(11), // Próxima semana
      hora: '09:00',
      lugar: 'Gimnasio Polideportivo',
      tipoActividad: 'Deportiva',
      creadoEn: Date.now() - 3600000 * 2,
    },
  ];
}
