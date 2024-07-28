import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Rol } from '../interfaces/api';

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

  //Obtener usuario por id
  getUsuarioByID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}User/usuario/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Usuario>();
      })
    );
  }

  //editarUsuario  (no implementado)
  putUsuario(usuario: Usuario): Observable<Usuario> {
    const id = usuario.idUsuario;
    return this.http.put<Usuario>(`${this.apiUrl}User/user/${id}`, usuario).pipe(
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






}
