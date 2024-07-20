import { Usuario } from "./usuario";

export interface Rol {
  idRol: number;
  nombre: string;
}

export interface Cita {
  idCita: number;
  fecha: string;
  hora: string;
  idPaciente: number;
  idMedico: number;
  motivoConsulta: string;
  horaCita: number;
}
//Interface para la vista de los turnos en ambos módulos
export interface CitaDetalle {
  id: number;
  fecha: string;
  hora: string;
  especialidad: string;
  profesional: string;
  diagnosticos: string;
  estado: string;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;
  imgSrc?: string;
}

export interface Horario {
  idHorario: number;
  rango: string;
}

export interface Mensaje {
  idMensaje: number;
  idEmisor: number;
  idReceptor: number;
  contenido: string;
  datetime: string;
  estado: string;
}