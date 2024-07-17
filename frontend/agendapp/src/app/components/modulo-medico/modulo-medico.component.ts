import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../services/filter.pipe';
import { CommonModule } from '@angular/common';
import { ApiProviderService } from '../../services/api-provider.service';
import { Cita } from '../../interfaces/api';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-modulo-medico',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    FormsModule,
    FilterPipe,
    CommonModule,
  ],
  templateUrl: './modulo-medico.component.html',
  styleUrl: './modulo-medico.component.css',
})
export class ModuloMedicoComponent implements OnInit {
  vistaHeader = true;
  section: string = '';
  citas: any[] = []; //desde el endpoint /citas del jsonserver
  cita: any = {};
  usuario = {} as Usuario;
  query: string = '';
  paciente = {} as Usuario;
  rangoHoraId = {}; //segun idHorario sus rangos en numeros

  constructor(
    private route: ActivatedRoute,
    private apiProviderService: ApiProviderService,
    private localServicr: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.getCitasMedico();
    this.getUsuarioById();
  }

  //Obtener usuario del LS  //!!temporalmente
  getUsuarioById() {
    const usuario = localStorage.getItem('medico') || '{}';
    this.usuario = JSON.parse(usuario);
    console.log('Usuario:', this.usuario);
  }

  //Obtener turnos del LS
  getCitasMedico() {
    this.apiProviderService.getCitas().subscribe((data: any) => {
      this.citas = data;
      this.citas.forEach((cita: any) => {
        this.getCitaDetalles(cita.idCita);
      });
      console.log(this.citas);
    });
  }

  //Obtener citas ID
  getCitaDetalles(id: number) {
    if (this.citas.length > 0) {
      this.citas.find((cita: Cita) => {
        if (cita.idCita === id) {
          this.cita = {
            idCita: cita.idCita,
            fecha: cita.fecha,
            hora: cita.hora,
            idPaciente: cita.idPaciente,
            idMedico: cita.idMedico,
            motivoConsulta: cita.motivoConsulta,
            horaCita: cita.horaCita,
          };
          this.getPacientePorId(cita.idPaciente);
          this.getHorarioPorId(cita.hora);
        }
      });
    }
  }

  //Obtener medico por id
  getPacientePorId(id: number) {
    this.apiProviderService.getUsuarioById(id).subscribe((data: any) => {
      this.paciente = data[0];     
      console.log('Paciente:', this.paciente);
    });
  }

  //obtener horarios por id
  getHorarioPorId(id: any) {
    this.apiProviderService.getHorarioById(id).subscribe((data: any) => {
      this.rangoHoraId = {
        rango: data[0]?.rango,
      };
      console.log('Horario:', this.rangoHoraId);
    });
  }
}
