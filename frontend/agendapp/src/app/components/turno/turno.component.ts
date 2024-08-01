import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common';


import { HorariosService } from '../../services/horarios.service';
import { SweetAlertService } from '../../services/alerts/sweet-alert.service';
import { AuthService } from '../../services/auth.service';
import { MedicosService } from '../../services/medicos.service';
import { CitasService } from '../../services/citas.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { Horario } from '../../interfaces/api';
import { Usuario } from '../../interfaces/usuario';
import { GenerarCita } from '../../interfaces/cita';
import { Medico } from '../../interfaces/medico';

@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css',
})
export class TurnoComponent implements OnInit {
  //variables de fecha en año-mes-dia
  fecha: string = new Date().toISOString().slice(0, 10); //2024-07-10
  fechaTope: string = '2024-12-31';
  usuario = {} as Usuario;
  medID: any;
  medico = {} as Medico;
  horario: any;
  horarios: Horario[] = [];

  turno: GenerarCita = {
    fecha: '',
    hora: '',
    idUsuario: 0,
    idMedico: 0,
    motivoConsulta: '',
  };

  private authService = inject(AuthService);
  private citaService = inject(CitasService);
  private medicoService = inject(MedicosService);
  private horarioService = inject(HorariosService);
  private router = inject(Router);
  private sweetService = inject(SweetAlertService);
  private location = inject(Location);

  constructor() {
    this.medID = localStorage.getItem('medicoId');
  }

  ngOnInit(): void {
    this.getUsuario();
    this.obtenerHorarios();
    this.obtenerMedico(parseInt(this.medID));
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

  //Obtener medico por id
  obtenerMedico(id: number) {
    this.medicoService.getMedicoById(id).subscribe((data: any) => {
      this.medico = data.data;
      this.horario = this.medico.idHorario;
      // console.log('Medico:', this.medico);
      // console.log('Horario actual del medico:', this.horario);
    });
  }

  //Obtener horarios de la DB
  obtenerHorarios() {
    this.horarioService.getHorarios().subscribe((data: any) => {
      this.horarios = data.data;
      // console.log('Horarios:', this.horarios);
    });
  }

  crearTurno(form: NgForm) {
    if (form.valid) {
      const obj = {
        fecha: form.value.turno,
        hora: form.value.rango,
        idUsuario: this.usuario.idUsuario,
        idMedico: parseInt(this.medID),
        motivoConsulta: form.value.motivo,
      };
      this.citaService.postCita(obj).subscribe((data: any) => {
        // console.log(data);
      });
      localStorage.setItem('turno', JSON.stringify(obj));
      this.sweetService.success('Turno creado');
      setTimeout(() => {
        this.router.navigate(['/mis_turnos']);
      }, 500);
    } else {
      this.sweetService.alert('Por favor complete todos los campos');
    }
  }

  Volver(): void {
    this.location.back();
  }
}
