import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FooterComponent, NavbarusuariologueadoComponent, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  usuario = {} as Usuario;

  private authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.getUsuario();
  }

  //Obtener el usuario
  getUsuario(): void {
    this.authService.usuario$.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      } else {
        console.log('No hay usuario logueado');
      }
    });
  }
}
