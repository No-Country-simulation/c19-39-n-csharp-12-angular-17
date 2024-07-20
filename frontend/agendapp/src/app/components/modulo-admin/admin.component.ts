import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FooterComponent, NavbarusuariologueadoComponent, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  section: string = '';
  usuario = {} as Usuario;

  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.getUsuario();
  }
  
  
  //Obtener el usuario
  getUsuario(): void {
  this.authService.getUserData().subscribe((usuario) => {
    this.usuario = usuario;
  });
}


}
