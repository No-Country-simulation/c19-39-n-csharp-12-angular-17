import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { MedicosService } from '../../services/medicos.service';

import { Usuario } from '../../interfaces/usuario';
import { Cita } from '../../interfaces/cita';


@Component({
  selector: 'app-turnodetalle',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './turnodetalle.component.html',
  styleUrl: './turnodetalle.component.css',
})
export class TurnodetalleComponent implements OnInit {
  turno = {} as Cita; 
  usuario = {} as Usuario; 
  usuarioMedico: any; 
  idParam: any;

  private citaService = inject(CitasService);
  private medicoService = inject(MedicosService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.idParam = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getCitaById(this.idParam);
  }

  //Obtener el usuario (payload del login)
  getUsuario(): void {
    this.authService.usuario$.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      } else {
        console.log('No hay usuario logueado');
      }
    });
  }

  //Obtener cita por id
  getCitaById(id: number) {
    this.citaService.getCitaByID(id).subscribe((data: any) => {
      this.turno = data.data;
      // console.log(this.turno);
      this.filterMedicoById(this.turno.idMedico);
    });
  }

  //Obtener medico por id del usuario
  private filterMedicoById(id: number) {
    this.medicoService.getMedicoById(id).subscribe((data: any) => {
      this.usuarioMedico = data.data.idUsuarioNavigation;
      // console.log(this.usuarioMedico);
    });
  }

}
