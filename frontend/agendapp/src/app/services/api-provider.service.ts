import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  //Obtener todos los médicos
  getMedicos() {
    return this.http.get(`${this.apiUrl}medicos`);
  }

  //Obtener todos los usuarios
  getPacientes() {
    return this.http.get(`${this.apiUrl}usuarios`);
  }

  //Obtener todas las especialidades
  getEspecialidades() {
    return this.http.get(`${this.apiUrl}especialidad`);
  }

  //Obtener todos los horarios
  getHorarios() {
    return this.http.get(`${this.apiUrl}horarios`);
  }

  //Obtener todos los citas
  getCitas() {
    return this.http.get(`${this.apiUrl}citas`);
  }

  //Obtener todas las consultas
  getTurnos() {
    return this.http.get(`${this.apiUrl}consultas`);
  }


  /********** funciones Locales  ************/
  obtenerUsuarioLocal(){
    const data = localStorage.getItem('usuario');
    if(data){
      return JSON.parse(data);
    }
    return [];
  }


  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

}
