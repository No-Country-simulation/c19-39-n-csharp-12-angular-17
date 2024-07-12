import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  //Registrar usuario
  registrarUsuario(usuario: any) {
    return this.http.post(`${this.apiUrl}Register/usuario`, usuario);
  }

  //Registrar medico
  registrarMedico(medico: any) {
    return this.http.post(`${this.apiUrl}Register/medico`, medico);
  }
}
