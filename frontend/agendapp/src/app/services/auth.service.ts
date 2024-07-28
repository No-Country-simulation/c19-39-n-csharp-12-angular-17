import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  private router = inject(Router);

  constructor() {
    this.getUserLogged();
    // console.log(this.usuario$);
  }

  //Descargar datos del usuario logueado en el LS (simula payload)
  getUserLogged() {
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      this.usuarioSubject.next(JSON.parse(usuarioJson));
    }
  }

  //obtener datos del usuario logueado
  getUserData(): Observable<Usuario | null> {
    return this.usuario$;
  }

  // Establece los datos del usuario y actualiza el estado observable
  setUsuario(usuario: Usuario) {
    this.usuarioSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  //obtener el rol
  getRol(): number | null {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario?.idRol || null;
  }

  // Verificar si el usuario es admin
  isAdmin(): boolean {
    const rol = this.getRol();
    return rol === 3;
  }

  //Al cerrar sesión, se elimina el token/usuario del LocalStorage y se redirige al login.
  logout(): void {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
    console.log('Sesión cerrada', this.usuario$);
    this.router.navigate(['/']);
  }
}
