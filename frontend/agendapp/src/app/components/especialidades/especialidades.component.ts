import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategoriasService } from '../../services/categorias.service';
import { AuthService } from '../../services/auth.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { Categoria } from '../../interfaces/api';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent, FooterComponent],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css',
})
export class EspecialidadesComponent implements OnInit {
  especialidades: Categoria[] = [];
  usuario: Usuario = {} as Usuario;

  private authService = inject(AuthService);
  private categoriaService = inject(CategoriasService);

  constructor() {}

  ngOnInit(): void {
    this.getEspecialidades();
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
        };
      });
    });
  }
}
