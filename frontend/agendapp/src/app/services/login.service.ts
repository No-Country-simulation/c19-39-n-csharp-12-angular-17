import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/auth';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  constructor(private http: HttpClient) {}

  //Loguear usuario
  loginUsuario(usuario: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}Auth/usuario`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Login>();
      })
    
    );
  }

  //Loguear medico
  loginMedico(medico: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}Auth/medico`, medico).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Login>();
      })
    );
  }
}
