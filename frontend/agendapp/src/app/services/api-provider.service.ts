import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiProviderService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  //Obtener todos los mensajes
  getMensajes() {
    return this.http.get(`${this.apiUrl}mensajes`);
  }

  //Obtener mensajes de un usuario
  getMensajeById(id: number) {
    return this.http.get(`${this.apiUrl}mensajes?idUsuario=${id}`);
  }
}
