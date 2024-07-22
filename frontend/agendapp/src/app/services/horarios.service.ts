import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Horario } from '../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  constructor(private http: HttpClient) {}
  //Obtener todos los horarios
  getHorarios(): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}Med/horarios`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Horario>();
      })
    );
  }

  //Obtener horario por id
  getHorarioByID(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}Med/horario/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Horario>();
      })
    );
  }

  //Crear horario
  postHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(`${this.apiUrl}Med/horario`, horario).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Horario>();
      })
    );
  }
}
