import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiProviderService } from '../../services/api-provider.service';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Cita } from '../../interfaces/api';
import { LocalStorageService } from '../../services/local-storage.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-ficha-paciente',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './ficha-paciente.component.html',
  styleUrl: './ficha-paciente.component.css',
})
export class FichaPacienteComponent implements OnInit {
  section: string = '';
  turno = {} as Cita; //turno con idHorario y idMedico
  usuario = {} as Usuario; //usuario logueado
  usuarioMedico: any; //medico con idMedico
  horario: any; //horario
  rangoHoraId: string = ''; //segun idHorario sus rangos en numeros
  horaCita: number | null = null; //hora de la cita
  idParam: any; //id del turno a buscar en LS

  constructor(
    private route: ActivatedRoute,
    private localServicr: LocalStorageService,
    private apiServiceProvider: ApiProviderService
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.idParam = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log(this.idParam);
    this.getUsuario();
    this.getTurnoDeLista(parseInt(this.idParam));
  }

  //Obtener usuario logueado del LS
  getUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuario = usuario;
  }

  //Turno por {id} del LS
  async getTurnoDeLista(id: number) {
    const lista = localStorage.getItem('ListaTurnos');
    const idBuscado = id;
    if (lista) {
      const listaTurnos = await JSON.parse(lista);
      console.log('Lista de turnos: ', listaTurnos);
      const turno = listaTurnos.find(
        (turno: Cita) => turno.idCita === idBuscado
      );
      this.turno = turno;
      console.log('Turno:', this.turno);
      this.usuarioMedico = this.turno.idMedico;
      this.rangoHoraId = this.turno.hora;
      this.horario = this.turno.horaCita; //horario tal cual tiene el turno creado ej: 17:00

      if (this.usuarioMedico) {
        this.getMedicoPorId(this.usuarioMedico);
      }

      if (this.rangoHoraId) {
        this.getHorarioPorId(this.rangoHoraId);
      }
    } else {
      console.log('No hay turnos en la lista del LS');
    }
  }

  //Obtener medico por id
  getMedicoPorId(id: number) {
    this.apiServiceProvider.getUsuarioById(id).subscribe((data: any) => {
      this.usuarioMedico = data[0];
      console.log('Medico:', this.usuarioMedico);
    });
  }

  //obtener horarios por id
  getHorarioPorId(id: any) {
    this.apiServiceProvider.getHorarioById(id).subscribe((data: any) => {
      this.rangoHoraId = data[0].rango;
      console.log('Horario:', this.rangoHoraId);
    });
  }
}