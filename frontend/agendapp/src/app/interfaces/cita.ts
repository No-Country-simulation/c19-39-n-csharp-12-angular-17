

//Interfaz de cita para la request getCitas() / getCitasByID()
export interface Cita {
  idCita: number;
  fecha: string;
  hora: string;
  idPaciente: number;
  idMedico: number;
  motivoConsulta: string;
  horaCita?: number;
}


//Interface para la vista del turno detalle del medico
// export interface CitaDetalle {
//   id: number;
//   fecha: string;
//   hora: string;
//   especialidad: string;
//   profesional: string;
//   diagnosticos: string;
//   estado: string;
// }


//Interfaz de cita para la creacion de una cita en el modulo usuario
export interface GenerarCita {
  fecha: string;
  hora: string;
  idUsuario: number;
  idMedico: number;
  motivoConsulta: string;
  horaCita?: number;
}