import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-turnodetalle',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent, FooterComponent],
  templateUrl: './turnodetalle.component.html',
  styleUrl: './turnodetalle.component.css',
})
export class TurnodetalleComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes
  turno: any = {};
  usuario: any = {};
  id: any;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';  
    this.id = this.route.snapshot.paramMap.get('id');  
  }

  ngOnInit(): void {
    console.log(this.id);
    this.getUsuario();
    this.getTurno();
  }

  //Obtener usuario del LS
  getUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(usuario);
    this.usuario = usuario;
  }

  //Obtener turno del LS
  getTurno() {
    let turno = JSON.parse(localStorage.getItem('turnoCreado') || '{}');
    console.log(turno);
    this.turno = turno;
  }

}
