export interface Rol {
  idRol: number;
  nombre: string;
}

export interface Cita {
  idCita: number;
  fecha: string;
  hora: string;
  idMedico: number;
  motivoConsulta: string;
}

export interface Especialidad {
  idEspecialidad: number;
  nombre: string;
}

export interface Horario {
  idHorario: number;
  rango: string;
}