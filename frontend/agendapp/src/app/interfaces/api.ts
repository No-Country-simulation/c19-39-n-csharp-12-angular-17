export interface Rol {
  idRol: number;
  nombre: string;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;
  imgSrc?: string;
  isEditable?: boolean;
}

export interface Horario {
  idHorario: number;
  rango: string;
  isEditable?: boolean;
}

