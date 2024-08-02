import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CitasService } from '../../services/citas.service';
import { MedicosService } from '../../services/medicos.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ModalEditarcitaComponent } from '../../shared/modal-editarcita/modal-editarcita.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { Usuario } from '../../interfaces/usuario';
import { Cita } from '../../interfaces/cita';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-ficha-paciente',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    CommonModule,
    ModalEditarcitaComponent,
  ],
  templateUrl: './ficha-paciente.component.html',
  styleUrl: './ficha-paciente.component.css',
})
export class FichaPacienteComponent implements OnInit {
  turno = {} as Cita;
  usuario = {} as Usuario;
  usuarioFicha: Usuario = {} as Usuario;
  usuarioMedico: any;
  idParam: any;
  datos: any = {};

  //Elementos para acceder al ID del modal y con el que 'abrimos' el modal en el componente padre
  @ViewChild(ModalEditarcitaComponent)
  modaleditarcita: ModalEditarcitaComponent = new ModalEditarcitaComponent();

  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private citaService = inject(CitasService);
  private medicoService = inject(MedicosService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.idParam = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getCitaById(parseInt(this.idParam));
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

  //Obtener cita por idParam
  getCitaById(id: number) {
    this.citaService.getCitaByID(id).subscribe((data: any) => {
      this.turno = data.data;
      //Datos para el modal de edicion (rol admin unicamente)
      this.datos = data.data;
      this.filtrarMedicoById(this.turno.idMedico);
      this.filtrarUsuarioByIdPaciente(this.turno.idPaciente);
    });
  }

  //Obtener medico por id
  private filtrarMedicoById(id: number) {
    this.medicoService.getMedicoById(id).subscribe((data: any) => {
      if (data.status === 400) {
        console.log('Error al obtener medico:', data.message);
      } else {
        this.usuarioMedico = data.data.idUsuarioNavigation;
      }
    });
  }

  private filtrarUsuarioByIdPaciente(id: number) {
    this.apiService.getUsuarioByID(id).subscribe((data: any) => {
      this.usuarioFicha = data;
      console.log('Usuario ficha:', this.usuarioFicha);
    });
  }

  //Acciones sobre los modales
  abrirModalEditarCita() {
    const modal = document.getElementById('modaleditarcita');
    if (modal) {
      const instanciaModal = new bootstrap.Modal(modal);
      instanciaModal.show();
    }
  }

  citaEditadaHandler(event: Cita) {
    console.log('Cita editada ' + JSON.stringify(event));
    this.getCitaById(parseInt(this.idParam));
  }
}
