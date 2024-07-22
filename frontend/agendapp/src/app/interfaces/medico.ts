import { Usuario } from "./usuario";

export interface Medico {
    idMedico: number;
    idUsuario: number;
    idCategoria: number;
    idHorario: number;
    idUsuarioNavigation: Usuario;
}