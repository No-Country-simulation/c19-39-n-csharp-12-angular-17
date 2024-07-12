import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  //Loguear usuario
  loginUsuario(usuario: any) {
    return this.http.post(`${this.apiUrl}Auth/usuario`, usuario);
  }

  //Loguear medico
  loginMedico(medico: any) {
    return this.http.post(`${this.apiUrl}Auth/medico`, medico);
  }
}
