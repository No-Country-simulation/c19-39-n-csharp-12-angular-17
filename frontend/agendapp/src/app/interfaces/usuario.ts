import { Rol, Cita } from './api';

export interface Usuario {
  idUsuario: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  contrasenia: string;
  rol: Rol;
  citas: Cita;
}
