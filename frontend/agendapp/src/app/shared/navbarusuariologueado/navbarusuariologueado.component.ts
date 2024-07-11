import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbarusuariologueado',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbarusuariologueado.component.html',
  styleUrl: './navbarusuariologueado.component.css',
})
export class NavbarusuariologueadoComponent {
  section: string = ''; //registro_medicos o registro_pacientes
  usuario: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.getUsuario();
  }

  //Obtener usuario del LS
  getUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    //console.log(usuario);
    this.usuario = usuario;
  }
}