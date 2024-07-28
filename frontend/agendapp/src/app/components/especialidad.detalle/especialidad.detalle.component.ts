import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CategoriasService } from '../../services/categorias.service';
import { HorariosService } from '../../services/horarios.service';
import { MedicosService } from '../../services/medicos.service';
import { AuthService } from '../../services/auth.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-especialidad.detalle',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent],
  templateUrl: './especialidad.detalle.component.html',
  styleUrl: './especialidad.detalle.component.css',
})
export class EspecialidadDetalleComponent implements OnInit {
  idCategoriaAFiltrar: number = 0;
  horario: any;
  especialidad: any;
  medicos: any[] = [];
  medicosFiltrados: any[] = [];
  usuario: Usuario = {} as Usuario;

  private medicoService = inject(MedicosService);
  private categoriaService = inject(CategoriasService);
  private horarioService = inject(HorariosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.idCategoriaAFiltrar = this.route.snapshot.paramMap.get('id')
      ? parseInt(this.route.snapshot.paramMap.get('id') || '0')
      : 0;
  }

  ngOnInit(): void {
    this.getEspecialidadById(this.idCategoriaAFiltrar);
    this.getMedicos();
    this.getUsuario();
  }

  //Obtener el usuario (payload del login)
  getUsuario(): void {
    this.authService.usuario$.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      } else {
        console.log('No hay usuario logueado');
      }
    });
  }

  guardarIdMedico(id: any) {
    this.router.navigate(['/turno']);
    localStorage.setItem('medicoId', id);
  }

  //Obtener especialidades
  getEspecialidadById(id: number) {
    this.categoriaService.getEspecialidadByID(id).subscribe((data: any) => {
      this.especialidad = data.data;
      // console.log(this.especialidad);
    });
  }

  //Obtener medicos
  getMedicos() {
    this.medicoService.getMedicos().subscribe((data: any) => {
      this.medicos = data;
      // console.log(this.medicos);
      this.medicosFiltrados = this.medicos.filter((medico: any) => {
        return medico.idCategoria === this.idCategoriaAFiltrar;
      });

      this.medicosFiltrados.forEach((medico: any) => {
        if (medico.idMedico && medico.idHorario) {
          this.filtrarHorariosId(medico.idHorario);
        }
      });

      // console.log(this.medicosFiltrados);
    });
  }

  filtrarHorariosId(id: number) {
    this.horarioService.getHorarioByID(id).subscribe((data: any) => {
      this.horario = data.data;
      // console.log(this.horario);
    });
  }
}
