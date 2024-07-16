import { Rol, Cita } from './api';

export interface Usuario {
  idUsuario: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  contrasenia: string;
  idRol: Rol;
  idRolNavigation: null;
  administradores: [];
  medicos: [];
  pacientes: [];
}
