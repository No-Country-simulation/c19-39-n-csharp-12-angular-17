import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { Especialidad } from '../../interfaces/api';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-modulo-usuario',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavbarusuariologueadoComponent],
  templateUrl: './modulo-usuario.component.html',
  styleUrl: './modulo-usuario.component.css',
})
export class ModuloUsuarioComponent implements OnInit {
  vistaHeader = true;
  section: string = '';
  citas: any[] = [];
  cita: any = {};
  especialidades: any[] = [];
  especialidad: any = {};
  //!!temporal
  usuario: any = {};


  constructor(
    private route: ActivatedRoute,
    private apiProviderService: ApiProviderService,
    private localServicr: LocalStorageService
  ) {
    
  }

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.localServicr.obtenerListaTurnos();
    this.getUsuario();
    // this.getCitas();
    this.getTurnoGuardado();
    this.getEspecialidades();
  }


  //Obtener usuario del LS  //!!temporalmente
  getUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(usuario);
    this.usuario = usuario;
  }

  // servicio de cita de la DB
  getCitas() {
    this.apiProviderService.getCitas().subscribe((data: any) => {
      data.forEach((cita: any) => {
        this.citas.push(cita);
        const obj = {
          id: cita.idCita,
          fecha: cita.fecha,
          hora: cita.hora,
          idMedico: cita.idMedico,
          motivo: cita.motivoConsulta,
        };
        this.cita = obj;
        console.log(this.citas);
      });
    });
  }

  //turno guardado en LS  //!!temporalmente
  getTurnoGuardado() {
    this.citas = this.localServicr.obtenerListaTurnos();
    this.citas.forEach((cita: any) => {
      const obj = {
        id: cita.idCita,
        fecha: cita.fecha,
        hora: cita.hora,
        paciente: cita.idPaciente,
        medico: cita.idMedico,
        motivo: cita.motivo,
      };
      this.cita = obj;
      console.log(cita);
    });

  }

  //Obtener especialidades de la DB
  getEspecialidades() {
    this.apiProviderService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.map((especialidad: Especialidad) => {
        let imgSrc = '';
        switch (especialidad.idCategoria) {
          case 1:
            imgSrc = '../../../assets/img/cardiology.svg';
            break;
          case 2:
            imgSrc = '../../../assets/img/dermatology.svg';
            break;
          case 3:
            imgSrc = '../../../assets/img/ginecology.svg';
            break;
          case 4:
            imgSrc = '../../../assets/img/neurology.svg';
            break;
        }
        const obj = {
          id: especialidad.idCategoria,
          nombre: especialidad.nombre,
          imgSrc: imgSrc,
        };
        this.especialidad = obj;
        return obj;
      });

      console.log(this.especialidades);
    });
  }

  limitEspecialidades() {
    return this.especialidades.slice(0, 4);
  }
}
