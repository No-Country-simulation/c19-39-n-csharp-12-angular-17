import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { Categoria, Horario } from '../../interfaces/api';
import { Usuario } from '../../interfaces/usuario';

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
  especialidades: Categoria[] = [];
  horarios: Horario[] = [];
  especialidadNombre = '';
  medicos: Usuario[] = [];

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
  guardarIdMedico(id: any) {
    this.router.navigate(['/turno']);
    localStorage.setItem('medicoId', id.toString());
  }

  //Obtener especialidades
  getEspecialidad(id: number) {
    this.apiProviderService.getEspecialidadById(id).subscribe((data: any) => {     
      this.especialidades = data;     
      this.especialidadNombre = this.especialidades[0].nombre;
      this.especialidades.forEach((especialidad: Categoria) => {
        if (especialidad.medicos && Array.isArray(especialidad.medicos)) {
          especialidad.medicos.forEach((medico: Usuario) => {
            this.medicos.push(medico);
          });
        }
      });

      console.log('Especialidades:', this.especialidades);
      console.log('Médicos:', this.medicos);
    });
  }

  //Obtener horarios
  getHorarios() {
    this.apiProviderService.getHorarios().subscribe((data: any) => {
      this.horarios.forEach((horario: Horario) => {
        this.horarios.push(horario);
      });
    });
  }
}
