import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  usuario: Usuario | null = null;
  isAdmin: boolean = false;
  isMedico: boolean = false;
  isUser: boolean = false;

  private authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
      this.actualizarUsuarioLogueado();
    });
  }

  logout() {
    this.authService.logout();
  }

  actualizarUsuarioLogueado(usuario?: Usuario | null) {
    if (usuario) {
      this.isUser = usuario.idRol === 1;
      this.isMedico = usuario.idRol === 2;
      this.isAdmin = usuario.idRol === 3;
    } else {
      this.isUser = this.isMedico = this.isAdmin = false;
    }
  }
}
