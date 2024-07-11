import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent, FooterComponent],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css',
})
export class EspecialidadesComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes
  especialidades: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiProviderService: ApiProviderService,
    private router: Router
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  //servicio de especialidades
  // getEspecialidades() {
  //   this.apiProviderService.getEspecialidades().subscribe((data: any) => {
  //     this.especialidades = data;
  //     console.log(this.especialidades);
  //   });
  // }

  //Obtener especialidades de la DB
  getEspecialidades() {
    this.apiProviderService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.map((especialidad: any) => {
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
          case 5:
            imgSrc = '../../../assets/img/neumonology.svg';
            break;
          case 6:
            imgSrc = '../../../assets/img/obstetritian.svg';
            break;
          case 7:
            imgSrc = '../../../assets/img/dentist.svg';
            break;
          case 8:
            imgSrc = '../../../assets/img/biohazard.png';
            break;
          case 9:
            imgSrc = '../../../assets/img/doctor.png';
            break;      
          default:
            break;
        }
       
        const obj = {
            id: especialidad.idCategoria,
            nombre: especialidad.nombre,
            imgSrc: imgSrc,
          };
          return obj;
        });

        console.log(this.especialidades);

    });
  }
}
