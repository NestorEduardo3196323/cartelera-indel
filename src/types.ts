/**
 * Tipos principales para la aplicación CARTELERA INDEL.
 */

export type TipoActividad = 
  | 'Académica'
  | 'Taller'
  | 'Institucional'
  | 'Cultural'
  | 'Deportiva';

export interface Evento {
  id: string;
  titulo: string;
  fecha: string;        // Formato estandarizado: 'YYYY-MM-DD'
  hora: string;         // Formato estandarizado: 'HH:mm' (24hs)
  lugar: string;
  tipoActividad: TipoActividad;
  creadoEn: number;     // Timestamp de creación
}

export type FiltroSemana = 'todas' | 'esta_semana' | 'proxima_semana' | 'historico';

export type FiltroTipo = 'todos' | TipoActividad;
