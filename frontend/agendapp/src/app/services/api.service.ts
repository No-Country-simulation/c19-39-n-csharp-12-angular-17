import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { catchError, Observable } from 'rxjs';
import { Categoria, Cita, Horario, Rol } from '../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  constructor(private http: HttpClient) {}

  //Obtener todos los usuarios
  getUsuarios(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}User/usuarios`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Usuario>();
      })
    );
  }

  //Obtener todos los medicos
  getMedicos(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}Med/medicos`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Usuario>();
      })
    );
  }


  //Obtener todos los roles
  getRoles(): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}User/roles`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Rol>();
      })
    );
  }
  //Obtener todas las especialidades
  getEspecialidades(): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}Med/categorias`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Categoria>();
      })
    );
  }
  //Obtener todos los horarios
  getHorarios(): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}Med/horarios`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Horario>();
      })
    );
  }

  getCitas(): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}App/citas`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Cita>();
      })
    );
  }
}
