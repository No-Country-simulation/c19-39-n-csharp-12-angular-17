import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Medico } from '../interfaces/medico';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  constructor(private http: HttpClient) {}

  //Obtener todos los medicos segun horario y categoria
  getMedicos(): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}Med/medicos`).pipe(
      map((response: any) => {
        const medicos = response.data;
        return medicos;
      })
    );
  }

  //Obtener medico por su id
  getMedicoById(id: number){
    return this.http.get<Medico>(`${this.apiUrl}Med/medico/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Medico>();
      })
    );
  }

}
