import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../interfaces/auth';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  private http = inject(HttpClient);

  constructor() {}

  //Loguear usuario
  login(usuario: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}Auth/usuario`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<Login>();
      })
    );
  }


}
