import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CitasService } from '../../services/citas.service';
import { CategoriasService } from '../../services/categorias.service';
import { HorariosService } from '../../services/horarios.service';
import { AuthService } from '../../services/auth.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ModalHorarioComponent } from '../../shared/modal-horario/modal-horario.component';
import { ModalCategoriaComponent } from '../../shared/modal-categoria/modal-categoria.component';

import { Categoria, Horario } from '../../interfaces/api';
import { Cita } from '../../interfaces/cita';
import { Usuario } from '../../interfaces/usuario';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    NavbarusuariologueadoComponent,
    FooterComponent,
    CommonModule,
    ModalHorarioComponent,
    ModalCategoriaComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  horarios: Horario[] = [];
  especialidades: Categoria[] = [];
  citas: Cita[] = [];
  isEditable: boolean = false;
  usuario: Usuario = {} as Usuario;

  //Elementos para acceder al ID del modal y con el que 'abrimos' el modal en el componente padre
  @ViewChild(ModalHorarioComponent) modalhorarios: ModalHorarioComponent =
    new ModalHorarioComponent();
  @ViewChild(ModalCategoriaComponent) modalcategorias: ModalCategoriaComponent =
    new ModalCategoriaComponent();

  horario: Horario = {
    idHorario: 0,
    rango: '',
  };

  especialidad: Categoria = {
    idCategoria: 0,
    nombre: '',
  };

  private citaService = inject(CitasService);
  private categoriaService = inject(CategoriasService);
  private horarioService = inject(HorariosService);
  private authService = inject(AuthService);

  private router = inject(Router);

  ngOnInit(): void {
    this.getEspecialidades();
    this.getHorarios();
    this.getCitas();
      this.getUsuario();
  }

  //Obtener el usuario (payload del login)
  getUsuario(): void {
    this.authService.getUserData().subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      } else {
        console.log('No hay usuario logueado');
      }
    });
  }

  //servicio de especialidades DB
  getEspecialidades() {
    this.categoriaService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.data;
      // console.log(this.especialidades);
    });
  }

  //servicio de horarios DB
  getHorarios() {
    this.horarioService.getHorarios().subscribe((data: any) => {
      this.horarios = data.data;
      // console.log(this.horarios);
    });
  }

  //servicio de citas DB
  getCitas() {
    this.citaService.getCitas().subscribe((data: any) => {
      this.citas = data.data.map((cita: Cita) => {
        return {
          ...cita,
        };
      });
      // console.log(this.citas);
    });
  }

  //Funciones de acciones para todos los grupos
  editarHorario(id: number, item: any) {
    item.isEditable = true;
    // console.log('Editar: ' + id);
  }

  editarCategoria(id: number, item: any) {
    item.isEditable = true;
    // console.log('Editar: ' + id);
  }

  //guardar Horario
  guardarHorario(id: number, horario: Horario) {
    horario.isEditable = false;
    const obj = {
      idHorario: id,
      rango: horario.rango,
    };
    this.horarioService.putHorario(obj).subscribe((data: any) => {
      console.log(data);
    });
  }

  //guardar Categoria
  guardarCategoria(id: number, categoria: Categoria) {
    categoria.isEditable = false;
    const obj = {
      idCategoria: id,
      nombre: categoria.nombre,
      imgSrc: '',
    };
    this.categoriaService.putCategoria(obj).subscribe((data: any) => {
      console.log(data);
    });
  }

  cancelar(item: any) {
    item.isEditable = false;
  }


  //Acciones sobre los modales
  abrirModalHorario() {
    const modal = document.getElementById('modalhorarios');
    if (modal) {
      const instanciaModal = new bootstrap.Modal(modal);
      instanciaModal.show();
    }
  }

  abrirModalCategoria() {
    const modal = document.getElementById('modalcategorias');
    if (modal) {
      const instanciaModal = new bootstrap.Modal(modal);
      instanciaModal.show();
    }
  }

  horarioAgregadoHandler(event: Horario) {
    console.log('Horario agregado' + event);
    this.getHorarios();
  }

  categoriaAgregadaHandler(event: Categoria) {
    console.log('Categoria agregada' + event);
    this.getEspecialidades();
  }

  //verCitaDetalle
  verCitaDetalle(id: number) {
    console.log('Ver cita: ' + id);
    this.router.navigate(['/ficha_paciente/', id]);
  }
}
