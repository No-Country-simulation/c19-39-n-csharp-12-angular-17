import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { Cita } from '../../interfaces/cita';

@Component({
  selector: 'app-listaturnos',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './listaturnos.component.html',
  styleUrl: './listaturnos.component.css',
})
export class ListaturnosComponent implements OnInit {
  section: string = '';
  citas: any[] = [];
  cita = {} as Cita;
  medico = {}; //medico con
  rangoHoraId = {}; //segun idHorario sus rangos en numeros
  citaHora: any;
  mediosYrangos: any[] = [];
  botonActivo: string = 'proximos';

  constructor(
    private route: ActivatedRoute,
    private apiProviderService: ApiProviderService,
    private localServicr: LocalStorageService,
    private router: Router
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    this.obtenerListaCitas();
    console.log(this.mediosYrangos);
  }

  setActivo(nombreBoton: string) {
    this.botonActivo = nombreBoton;
  }

  verTurnoDetalle(id: number): void {
    this.router.navigate(['/turno/', id]);
  }

  //Obtener citas LS
  obtenerListaCitas() {
    this.citas = this.localServicr.obtenerListaTurnos();
    console.log(this.citas);
    this.citas.forEach((cita) => {
      this.getCitaDetalles(cita.idCita);
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
          this.getMedicoPorId(cita.idMedico);
          this.getHorarioPorId(cita.hora);
          this.citaHora = cita.horaCita;
        }
      });
    }
  }

  //Obtener medico por id
  getMedicoPorId(id: number) {
    this.apiProviderService.getUsuarioById(id).subscribe((data: any) => {
      this.medico = {
        idUsuario: data[0].idUsuario,
        nombre: data[0].nombre,
        apellido: data[0].apellido,
      };
      console.log('Medico:', this.medico);
      this.mediosYrangos.push({ ...this.medico });
    });
  }

  //obtener horarios por id
  getHorarioPorId(id: any) {
    this.apiProviderService.getHorarioById(id).subscribe((data: any) => {
      this.rangoHoraId = {
        rango: data[0].rango,
      };
      console.log('Horario:', this.rangoHoraId);
      this.mediosYrangos.push({ ...this.rangoHoraId });
    });
  }
}
