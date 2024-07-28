import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Cita, GenerarCita } from '../interfaces/cita';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  constructor(private http: HttpClient) {}

  //Obtener todas las citas
  getCitas(): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}App/citas`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Cita>();
      })
    );
  }

  //Obtener cita por id
  getCitaByID(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}App/cita/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Cita>();
      })
    );
  }

  //Crear cita
  postCita(cita: GenerarCita): Observable<GenerarCita> {
    return this.http.post<GenerarCita>(`${this.apiUrl}User/cita`, cita).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<GenerarCita>();
      })
    );
  }

  //Consultar cita segun id usuario
getCitasByUsuario(id: number): Observable<Cita> {
  return this.http.get<Cita>(`${this.apiUrl}User/citas/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      return new Observable<Cita>();
    })
  );
}


  //Consultar cita segun id medico
  getCitasByMedico(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}Med/citas/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Cita>();
      })
    );
  }

  //Actualizar cita
  putCita(cita: Cita): Observable<Cita> {
    const id = cita.idCita;
    return this.http.put<Cita>(`${this.apiUrl}App/cita/${id}`, cita).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Cita>();
      })
    );
  }

}
