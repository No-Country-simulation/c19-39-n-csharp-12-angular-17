import { inject, Injectable } from '@angular/core';
import { ApiProviderService } from './api-provider.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiProviderService = inject(ApiProviderService);
  router = inject(Router);

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  //obtener datos del usuario logueado
  getUserData() {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(usuario);
    return of(usuario);
  }

  //obtener el rol
  getRol() {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(usuario.idRol);
    return usuario.idRol;
  }

  isAdmin() {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(usuario.idRol);
    if(usuario.idRol === 3){
      this.router.serializeUrl(this.router.createUrlTree(['/admin']));
      return true;
    }else{
      return false;
    }

  }
}
