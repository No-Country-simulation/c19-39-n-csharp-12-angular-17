export interface Login {
    email: string;
    password: string;
}

export interface UsuarioRegister {
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    password: string;
}

export interface MedicoRegister {
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    password: string;
    idCategoria: number;
    idHorario: number;
}