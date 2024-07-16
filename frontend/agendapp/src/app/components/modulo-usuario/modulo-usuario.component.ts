import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { Categoria, Cita } from '../../interfaces/api';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modulo-usuario',
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    NavbarusuariologueadoComponent,
    CommonModule,
  ],
  templateUrl: './modulo-usuario.component.html',
  styleUrl: './modulo-usuario.component.css',
})
export class ModuloUsuarioComponent implements OnInit {
  vistaHeader = true;
  section: string = '';
  citas: Cita[] = [];
  cita = {} as Cita;
  especialidades: Categoria[] = [];
  especialidad = {} as Categoria;
  usuarioMedico: any; //medico con idMedico
  horario: any; //horario
  horarioRango: any; //rango de horario
  //!!temporal
  usuario = {} as Usuario;

  constructor(
    private route: ActivatedRoute,
    private apiProviderService: ApiProviderService,
    private localServicr: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.getUsuario();
    this.obtenerListaCitas();
    this.getEspecialidades();
  }

  //Obtener usuario del LS  //!!temporalmente
  getUsuario(): void {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    // console.log(usuario);
    this.usuario = usuario;
  }

  // servicio de cita de la JsonServer
  // getCitas(): void {
  //   this.apiProviderService.getCitas().subscribe((data: any) => {
  //     data.forEach((cita: Cita) => {
  //       this.citas.push(cita);
  //       this.cita = cita;
  //       console.log(this.cita);
  //     });
  //   });
  // }

  //funcion auxiliar para obtener el turno seleccionado por id del LS
  //Obtener citas LS
  obtenerListaCitas() {
    this.citas = this.localServicr.obtenerListaTurnos();
    console.log(this.citas);
    this.citas.map((cita) => {
      this.getCitaDetalles(cita.idCita);
    });
  }

  //Obtener citas ID
  getCitaDetalles(id: number) {
    this.citas.forEach((cita) => {
      if (cita.idCita === id) {
        this.getMedicoPorId(cita.idMedico);
        this.getHorarioPorId(cita.hora);
      }
    });
  }

  //Obtener medico por id
  getMedicoPorId(id: number) {
    this.apiProviderService.getUsuarioById(id).subscribe((data: any) => {
      this.usuarioMedico = data[0];
      console.log('Medico:', this.usuarioMedico);
    });
  }

  //obtener horarios por id
  getHorarioPorId(id: any) {
    this.apiProviderService.getHorarioById(id).subscribe((data: any) => {
      this.horario = data[0];
      console.log('Horario:', this.horario);
    });
  }

  //Obtener especialidades de la DB
  getEspecialidades(): void {
    this.apiProviderService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.map((especialidad: Categoria) => {
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
          medicos: [],
        };
        return obj;
      });

      // console.log(this.especialidades);
    });
  }

  limitEspecialidades(): Categoria[] {
    return this.especialidades.slice(0, 4);
  }

  verTurnoDetalle(id: number): void {
    this.router.navigate(['/turno/', id]);
  }
}
