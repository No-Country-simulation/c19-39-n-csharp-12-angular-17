import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ApiProviderService } from '../../services/api-provider.service';

@Component({
  selector: 'app-especialidad.detalle',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent],
  templateUrl: './especialidad.detalle.component.html',
  styleUrl: './especialidad.detalle.component.css',
})
export class EspecialidadDetalleComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes
  id: number = 0;
  especialidades: any[] = [];
  medicos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiProviderService: ApiProviderService,
    private router: Router
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getEspecialidad(this.id);
  }

  //!!eliminar
  guardarIdMedico(id: string | number) {
    console.log('Medico id: ' + id);
    this.router.navigate(['/turno']);
    localStorage.setItem('medicoId', id.toString());//!!eliminar
  }

  getEspecialidad(id: number) {
    this.apiProviderService.getEspecialidadById(this.id).subscribe((data: any) => {
      this.especialidades = data;
      console.log('Especialidades:', this.especialidades);
      this.especialidades.forEach((especialidad: any) => {
        if (especialidad.medicos && Array.isArray(especialidad.medicos)) {
          especialidad.medicos.forEach((medico: any) => {
            this.medicos.push(medico);
          });
        }
      });

      console.log('Especialidades:', this.especialidades);
      console.log('Médicos:', this.medicos);
    });
  }
}
