export interface Rol {
  idRol: number;
  nombre: string;
  usuarios: [];
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
  medicos?: [];
}

export interface Horario {
  idHorario: number;
  rango: string;
  medicos: [];
}