import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Categoria, Horario, Rol } from '../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class ApiProviderService {
  private apiUrl = 'http://localhost:3000/';
  
  constructor(private http: HttpClient) {}

  
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

  //Obtener todos los mensajes
  getMensajes() {
    return this.http.get(`${this.apiUrl}mensajes`);
  }

  //Obtener mensajes de un usuario
  getMensajeById(id: number) {
    return this.http.get(`${this.apiUrl}mensajes?idUsuario=${id}`);
  }

}
