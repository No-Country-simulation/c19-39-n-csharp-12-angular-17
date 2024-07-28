export interface Cita {
  idCita: number;
  fecha: string;
  hora: string;
  idPaciente: number;
  idMedico: number;
  motivoConsulta: string;
  medico?: any;
  categoria?: any;
}


export interface GenerarCita {
  fecha: string;
  hora: string;
  idUsuario: number;
  idMedico: number;
  motivoConsulta: string;
}