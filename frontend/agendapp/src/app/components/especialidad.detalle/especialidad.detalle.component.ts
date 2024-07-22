import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { Categoria, Horario } from '../../interfaces/api';
import { Usuario } from '../../interfaces/usuario';
import { ApiService } from '../../services/api.service';
import { CategoriasService } from '../../services/categorias.service';
import { HorariosService } from '../../services/horarios.service';
import { Medico } from '../../interfaces/medico';
import { MedicosService } from '../../services/medicos.service';

@Component({
  selector: 'app-especialidad.detalle',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent],
  templateUrl: './especialidad.detalle.component.html',
  styleUrl: './especialidad.detalle.component.css',
})
export class EspecialidadDetalleComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes
  idCategoriaAFiltrar: number = 0;
  idHorarioAFiltrar: number = 0;
  horarios: Horario[] = [];
  especialidades: Categoria[] = [];
  especialidad: any;
  medicos: any[] = [];
  medicosFiltrados: any[] = [];
  medicosFiltradosPorHorario: any[] = [];
  medicosFiltradosPorCategoria: any[] = [];

  private apiService = inject(ApiService);
  private medicoService = inject(MedicosService);
  private categoriaService = inject(CategoriasService);
  private horarioService = inject(HorariosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.idCategoriaAFiltrar = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getEspecialidades();
    this.getEspecialidadById(this.idCategoriaAFiltrar);
    this.getHorarios();
    this.getMedicosData();
  }

  //!!eliminar
  guardarIdMedico(id: any) {
    this.router.navigate(['/turno']);
    localStorage.setItem('medicoId', id.toString());
  }


  //obtener especialidades
  getEspecialidades() {
    this.categoriaService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.data;
      console.log(this.especialidades);
    });
  }

  //Obtener especialidades
  getEspecialidadById(id: number) {
    this.categoriaService.getEspecialidadByID(id).subscribe((data: any) => {
      this.especialidad = data.data;
      console.log(this.especialidad);
    });
  }

  //Obtener horarios
  getHorarios() {
    this.horarioService.getHorarios().subscribe((data: any) => {
      this.horarios = data.data;
      console.log(this.horarios);
    });
  }

  //Obtener medicos
  getMedicosData() {
    this.medicoService.getMedicosDataUsuario().subscribe((data: any) => {
      this.medicos = data;
      console.log(this.medicos);
      this.idCategoriaAFiltrar = this.medicos[0].idCategoria;
      this.idHorarioAFiltrar = this.medicos[0].idHorario;
      this.filtrarMedicosPorCategoria(this.idCategoriaAFiltrar);
      this.filtrarMedicosPorHorario(this.idHorarioAFiltrar);
    });
  }

  //obtener medicos por horario
  private filtrarMedicosPorHorario(id: number) {
    console.log('Medicos:', this.medicos);

    this.medicosFiltradosPorHorario = this.medicosFiltrados.filter((medico) => {
      return medico.idHorario === id;
    });
    console.log(
      'Medicos filtrados por Horario ' + this.medicosFiltradosPorHorario
    );
  }

  //obtener medicos por categoria
  private filtrarMedicosPorCategoria(id: number) {
    console.log('Medicos:', this.medicos);

    this.medicosFiltradosPorCategoria = this.medicos.filter((medico) => {
      return medico.idCategoria === id;
    });
    console.log(
      'Medicos filtrados por Categoria ' + this.medicosFiltradosPorCategoria
    );
  }
}
