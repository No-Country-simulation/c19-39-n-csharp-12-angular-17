import { Rol, Cita, Horario, Especialidad } from './api';

export interface Medico {
  idUsuario: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  contrasenia: string;
  licenciaMedica: string;
  especialidad: Especialidad;
  rol: Rol;
  horario: Horario;
}
