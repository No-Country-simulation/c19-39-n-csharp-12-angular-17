import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicoRegister, UsuarioRegister } from '../interfaces/auth';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  constructor(private http: HttpClient) {}

  //Registrar usuario
  registrarUsuario(usuario: UsuarioRegister):Observable<UsuarioRegister> {
    return this.http.post<UsuarioRegister>(`${this.apiUrl}Register/usuario`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('desde registrar usuario');
        return new Observable<UsuarioRegister>();
      })
    );
  }

  //Registrar medico
  registrarMedico(medico: MedicoRegister):Observable<MedicoRegister> {
    return this.http.post<MedicoRegister>(`${this.apiUrl}Register/medico`, medico).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<MedicoRegister>();
      })
    );
  }
}
