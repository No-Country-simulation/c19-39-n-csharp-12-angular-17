import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiProviderService {
  // private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  // //Obtener todos los usuarios
  // getUsuarios() {
  //   return this.http.get(`${this.apiUrl}User/usuarios`);
  // }

  // //Obtener todos los roles
  // getRoles() {
  //   return this.http.get(`${this.apiUrl}User/roles`);
  // }

  // //Obtener todas las especialidades
  // getEspecialidades() {
  //   return this.http.get(`${this.apiUrl}Med/categorias`);
  // }

  // //Obtener todos los horarios
  // getHorarios() {
  //   return this.http.get(`${this.apiUrl}Med/horarios`);
  // }


  /************  Funciones temp db.json ***************/
  private apiUrl = 'http://localhost:3000/';


  //Obtener todos los usuarios
  getUsuarios() {
    return this.http.get(`${this.apiUrl}usuarios`);
  }

  //Obtener un usuario por id
  getUsuarioById(id: number) {
    return this.http.get(`${this.apiUrl}usuarios?idUsuario=${id}`);
  }

  //Obtener todos los roles
  getRoles() {
    return this.http.get(`${this.apiUrl}roles`);
  }

  //Obtener un rol por id
  getRolById(id: number) {
    return this.http.get(`${this.apiUrl}roles?idRol=${id}`);
  }

  //Obtener todas las especialidades
  getEspecialidades() {
    return this.http.get(`${this.apiUrl}categorias`);
  }

  //Obtener una especialidad por id
  getEspecialidadById(id: number) {
    return this.http.get(`${this.apiUrl}categorias?idCategoria=${id}`);
  }

  //Obtener todos los horarios
  getHorarios() {
    return this.http.get(`${this.apiUrl}horarios`);
  }

  //Obtener un horario por id
  getHorarioById(id: number) {
    return this.http.get(`${this.apiUrl}horarios?idHorario=${id}`);
  }

  //Obtener todos los citas **temporal
  getCitas() {
    return this.http.get(`${this.apiUrl}citas`);
  }

  //Obtener una cita por id
  getCitaById(id: number) {
    return this.http.get(`${this.apiUrl}citas?idCita=${id}`);
  }

  //Obtener todas las consultas **temporal
  getTurnos() {
    return this.http.get(`${this.apiUrl}consultas`);
  }

  //Obtener una consulta por id
  getTurnoById(id: number) {
    return this.http.get(`${this.apiUrl}consultas?idConsulta=${id}`);
  }
}
