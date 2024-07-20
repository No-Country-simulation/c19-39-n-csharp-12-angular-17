import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-navbarusuariologueado',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbarusuariologueado.component.html',
  styleUrl: './navbarusuariologueado.component.css',
})
export class NavbarusuariologueadoComponent {
  section: string = ''; //registro_medicos o registro_pacientes
  usuario = {} as Usuario;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    if (
      this.section === 'home_usuario' ||
      this.section === 'mis_turnos' ||
      this.section === 'especialidades' ||
      this.section === 'turno'
    ) {
      this.getUsuario();
    } else if (
      this.section === 'home_medico' ||
      this.section === 'buscar' ||
      this.section === 'inbox' ||
      this.section === 'videllamada'
    ) {
      this.getUsuario();
    }else if( this.section === 'admin' ||
      this.section === 'buscar_usuarios' ||
      this.section === 'inbox_admin' ||
      this.section === 'configuraciones'
    ){
      this.getUsuario();
    }
  }

  //Obtener usuario del LS
  getUsuario(): void {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuario = usuario;
  }

  // getMedico(): void {
  //   let medico = JSON.parse(localStorage.getItem('medico') || '{}');
  //   this.usuario = medico;
  // }

  // getAdmin(): void {
  //   let admin = JSON.parse(localStorage.getItem('admin') || '{}');
  //   this.usuario = admin;
  // }
}
