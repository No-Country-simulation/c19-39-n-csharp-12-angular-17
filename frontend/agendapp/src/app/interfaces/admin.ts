import { Rol } from './api';

export interface Admin {
  idUsuario: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  contrasenia: string;
  rol: Rol;
}


