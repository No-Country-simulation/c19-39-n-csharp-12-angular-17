import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Horario } from '../../interfaces/api';
import { ApiProviderService } from '../../services/api-provider.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Usuario } from '../../interfaces/usuario';
import { Cita } from '../../interfaces/cita';
import { HorariosService } from '../../services/horarios.service';
import { ApiService } from '../../services/api.service';
import { SweetAlertService } from '../../services/alerts/sweet-alert.service';

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
  usuario = {} as Usuario; //usuario logueado
  medID: any; //simulando id del medico seleccionado
  id: number = 0; //id del medico para obtener datos de la DB
  medico = {} as Usuario; //medico seleccionado
  horarios: Horario[] = []; //horarios disponibles
  contador: number = 0; //contador de turnos creados
  rangoHoras: number[] = []; //segun idHorario sus rangos en numeros
  horaCita: number | null = null; //hora de la cita
  idHorarioElegido: number | null = null; //idHorario seleccionado

  turno: Cita = {
    idCita: 0,
    fecha: '',
    hora: '',
    idPaciente: 0,
    idMedico: 0,
    motivoConsulta: '',
    horaCita: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private apiServiceProvider: ApiProviderService,
    private apiService: ApiService,
    private horarioService: HorariosService,
    private router: Router,
    private localServicr: LocalStorageService,
    private sweetService: SweetAlertService,
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.medID = localStorage.getItem('medicoId');
  }

  ngOnInit(): void {
    // this.obtenerUsuario();
    this.obtenerHorarios();
    this.obtenerMedico(this.medID);
  }

  //obtener usuario logueado
  obtenerUsuario() {
    this.apiService.getUsuarioByID(1).subscribe((data: any) => {
      this.usuario = data;
      console.log('Usuario:', this.usuario);

    });
    // let data = JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  //Obtener medico del JSON server
  obtenerMedico(id: number) {
    this.apiServiceProvider.getUsuarioById(id).subscribe((data: any) => {
      console.log('Medico:', data);
      this.medico = data;
    });
  }

  crearTurno(form: NgForm) {
    if (form.valid) {
      const nuevoIdCita = this.generarIdUnico();
      const obj = {
        idCita: nuevoIdCita,
        fecha: form.value.turno,
        hora: form.value.idHorario,
        idPaciente: this.usuario.idUsuario, //id del paciente logueado
        idMedico: parseInt(this.medID), //id del medico obtenido del LS
        motivoConsulta: form.value.motivo, //input text
        horaCita: this.horaCita, //hora elegido sobre el range de horarios
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
          obj.motivoConsulta +
          ' ' +
          obj.horaCita
      );
      //guardar en localStorage en una lista de turnos creados
      this.localServicr.guardarTurno(obj);
      this.router.navigate(['/turno/' + obj.idCita]);
      this.sweetService.success("Turno creado")
    } else {
      this.sweetService.alert('Por favor complete todos los campos')
      // alert('Por favor complete todos los campos');
    }
  }

  generarIdUnico(): number {
    return Date.now() + Math.floor(Math.random() * 10); //
  }

  //Obtener horarios de la DB
  obtenerHorarios() {
    this.horarioService.getHorarios().subscribe((data: any) => {
      this.horarios = data.data;
      console.log('Horarios:', this.horarios);
    });
  }

  //select con el rango
  onChangeHorario(event: any) {
    const horarioElegidoId = parseInt(event.target.value, 10);
    this.filtrarHorarios(horarioElegidoId);
    console.log('Horario de lista elegido:', horarioElegidoId); //    5 == '20:00 - 22:00'
  }

  //se obtiene el objeto horario filtrado por id y sus rangos de horas
  filtrarHorarios(idHora: number) {
    const horario = this.horarios.find(
      (horario) => horario.idHorario === idHora
    );
    if (horario) {
      this.rangoHoras = this.obtenerRangoHoras(horario.rango); // [20, 21, 22]
    }
    console.log('Encontrado: ', horario, 'RangoHoras: ', this.rangoHoras);
  }

  verDato(id: number) {
    this.horaCita = this.rangoHoras.find((hora) => hora === id) ?? 0;
    console.log('Hora elegida:', this.horaCita);
  }

  obtenerRangoHoras(rango: string): number[] {
    const horas = rango.match(/\d{2}:\d{2}/g); // Extraer las horas
    if (horas && horas.length === 2) {
      const horaInicio = parseInt(horas[0].split(':')[0], 10);
      console.log('Hora inicio:', horaInicio); //Hora inicio: 08
      const horaFin = parseInt(horas[1].split(':')[0], 10);
      console.log('Hora fin:', horaFin); //Hora fin: 12
      return this.generarSecuenciaHoras(horaInicio, horaFin);
    }
    return [];
  }

  generarSecuenciaHoras(horaInicio: number, horaFin: number): number[] {
    const horas = [];
    for (let i = horaInicio; i <= horaFin; i++) {
      horas.push(i);
    }
    return horas;
  }
}
