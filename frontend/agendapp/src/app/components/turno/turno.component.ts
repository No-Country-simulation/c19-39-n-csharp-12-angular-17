import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Horario } from '../../interfaces/api';
import { ApiProviderService } from '../../services/api-provider.service';
import { LocalStorageService } from '../../services/local-storage.service';
import Swal from 'sweetalert2';

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
  section: string = ''; //registro_medicos o registro_pacientes
  usuario: any = {}; //usuario logueado
  medID: any; //simulando id del medico seleccionado
  id: number = 0; //id del medico para obtener datos de la DB
  medico: any = {}; //medico seleccionado
  horarios: Horario[] = []; //horarios disponibles
  contador: number = 0; //contador de turnos creados

  constructor(
    private route: ActivatedRoute,
    private apiServiceProvider: ApiProviderService,
    private router: Router,
    private localServicr: LocalStorageService
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.medID = localStorage.getItem('medicoId');
  }

  ngOnInit(): void {
    console.log(this.medID);
    this.obtenerUsuario();
    this.obtenerHorarios();
    this.obtenerMedico(this.id);
  }

  //obtener usuario logueado
  obtenerUsuario() {
    let data = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuario = data;
    console.log('Usuario:', this.usuario);
  }

  crearTurno(form: NgForm) {
    if (form.valid) {
      const nuevoIdCita = this.generarIdUnico();
      const obj = {
        idCita: nuevoIdCita,
        fecha: form.value.turno, //input date
        hora: form.value.rango, //select con opciones del DB
        idPaciente: this.usuario.id, //id del paciente logueado
        idMedico: this.medID, //id del medico seleccionado en especialidad/:id
        motivo: form.value.motivo, //input text
      };
      console.log(
        'simulando envio de cita/turno ' +
          obj.idCita +
          ' ' +
          obj.fecha +
          ' ' +
          obj.hora +
          ' ' +
          obj.idPaciente +
          ' ' +
          obj.idMedico +
          ' ' +
          obj.motivo
      );

      //guardar en localStorage en una lista de turnos creados
      this.localServicr.guardarTurno(obj);
      this.router.navigate(['/turno/' + obj.idCita]);
    } else {
      Swal.fire({
        icon: "error",
        title: 'Por favor, completa todos los campos.',
        showConfirmButton: false,
      });
    }
  }

  generarIdUnico(): number {
    return Date.now() + Math.floor(Math.random() * 10); //
  }

  //Obtener horarios de la DB
  obtenerHorarios() {
    this.apiServiceProvider.getHorarios().subscribe((data: any) => {
      this.horarios = data;
      // console.log('Horarios:', this.horarios);
    });
  }

  //Obtener medico de la DB
  obtenerMedico(id: number) {
    this.apiServiceProvider.getUsuarioById(this.id).subscribe((data: any) => {
      console.log('Medico:', data);
      this.medico = data;
    });
  }
}
