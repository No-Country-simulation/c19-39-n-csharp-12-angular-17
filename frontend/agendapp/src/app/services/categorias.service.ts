import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Categoria } from '../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  constructor(private http: HttpClient) {}

  //Obtener todas las especialidades
  getEspecialidades(): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}Med/categorias`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Categoria>();
      })
    );
  }

  //Obtener especialidad por id
  getEspecialidadByID(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}Med/categoria/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Categoria>();
      })
    );
  }

  //crear especialidad  (falta hacerla)
  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}Med/categoria`, categoria).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Categoria>();
      })
    );
  }
}
