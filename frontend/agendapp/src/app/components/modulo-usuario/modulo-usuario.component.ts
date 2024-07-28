import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HorariosService } from '../../services/horarios.service';
import { CategoriasService } from '../../services/categorias.service';
import { CitasService } from '../../services/citas.service';
import { MedicosService } from '../../services/medicos.service';
import { AuthService } from '../../services/auth.service';

import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';

import { Usuario } from '../../interfaces/usuario';
import { Categoria } from '../../interfaces/api';
import { Cita } from '../../interfaces/cita';
import { CategoriaNombrePipe } from '../../services/categoria-nombre.pipe';

@Component({
  selector: 'app-modulo-usuario',
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    NavbarusuariologueadoComponent,
    CommonModule,
    CategoriaNombrePipe,
  ],
  templateUrl: './modulo-usuario.component.html',
  styleUrl: './modulo-usuario.component.css',
})
export class ModuloUsuarioComponent implements OnInit {
  citas: Cita[] = [];
  especialidades: Categoria[] = [];
  usuario = {} as Usuario;
  private medicosMap: { [id: number]: any } = {};

  authService = inject(AuthService);
  horarioService = inject(HorariosService);
  categoriaService = inject(CategoriasService);
  medicoService = inject(MedicosService);
  citaService = inject(CitasService);
  router = inject(Router);

  ngOnInit(): void {
    this.getEspecialidades();
    this.getUsuario();
    this.obtenerCitasByUsuario(this.usuario.idUsuario);
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

  obtenerCitasByUsuario(id: number) {
    this.citaService.getCitasByUsuario(id).subscribe((data: any) => {
      this.citas = data.data;
      // console.log(this.citas);
      this.citas.forEach((cita, index) => {
        this.filterMedicoById(cita.idMedico, index);
      });
    });
  }

  // Obtener médico por id y agregar los datos al objeto de la cita
  private filterMedicoById(id: number, citaIndex: number) {
    if (!this.medicosMap[id]) {
      this.medicoService.getMedicoById(id).subscribe((data: any) => {
        if (data.status === 400) {
          //console.log(data.message);
        } else {
          const medicoData = data.data.idUsuarioNavigation;
          const categoria = data.data.idCategoria;
          this.medicosMap[id] = medicoData;
          this.medicosMap[id].categoria = categoria;
          this.citas[citaIndex] = {
            ...this.citas[citaIndex],
            medico: medicoData,
            categoria: categoria,
          };
        }
      });
    } else {
      this.citas[citaIndex] = {
        ...this.citas[citaIndex],
        medico: this.medicosMap[id],
        categoria: this.medicosMap[id].categoria,
      };
    }
  }

  //Obtener especialidades de la DB
  getEspecialidades() {
    const categoryImageMap: { [key: string]: string } = {
      Cardiología: '../../../assets/img/cardiology.svg',
      Dermatología: '../../../assets/img/dermatology.svg',
      Endocrinología: '../../../assets/img/endocrinology.png',
      Obstetricia: '../../../assets/img/obstetritian.svg',
      Geriatría: '../../../assets/img/geriatrics.png',
      Neurología: '../../../assets/img/neurology.svg',
      Ginecologia: '../../../assets/img/ginecology.svg',
      Radiología: '../../../assets/img/biohazard.png',
    };

    this.categoriaService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.data.map((especialidad: Categoria) => {
        const imgSrc =
          categoryImageMap[especialidad.nombre] ||
          '../../../assets/img/logo.png';

        return {
          idCategoria: especialidad.idCategoria,
          nombre: especialidad.nombre,
          imgSrc: imgSrc,
          isEditable: false, //para editar en otro momento
        };
      });
    });
  }

  limitEspecialidades(): Categoria[] {
    return this.especialidades.slice(0, 4);
  }

  limitCitasVistas(): Cita[] {
    return this.citas.slice(0, 2);
  }

  verTurnoDetalle(id: number): void {
    this.router.navigate(['/turno/', id]);
  }
}
