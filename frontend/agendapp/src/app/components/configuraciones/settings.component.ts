import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Categoria, Horario } from '../../interfaces/api';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../interfaces/cita';
import { CategoriasService } from '../../services/categorias.service';
import { HorariosService } from '../../services/horarios.service';
import { ModalHorarioComponent } from '../../shared/modal-horario/modal-horario.component';
import * as bootstrap from 'bootstrap';
import { ModalCategoriaComponent } from '../../shared/modal-categoria/modal-categoria.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    NavbarusuariologueadoComponent,
    FooterComponent,
    CommonModule,
    ModalHorarioComponent,
    ModalCategoriaComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  horarios: Horario[] = [];
  especialidades: Categoria[] = [];
  citas: Cita[] = [];
  isEditable: boolean = false;

//Elementos para acceder al ID del modal y con el que 'abrimos' el modal en el componente padre
  @ViewChild(ModalHorarioComponent) modalhorarios: ModalHorarioComponent = new ModalHorarioComponent();
  @ViewChild(ModalCategoriaComponent) modalcategorias: ModalCategoriaComponent = new ModalCategoriaComponent();

  horario: Horario = {
    idHorario: 0,
    rango: '',
  };

  especialidad: Categoria = {
    idCategoria: 0,
    nombre: '',
    imgSrc: '',
  };

  cita: Cita = {
    idCita: 0,
    fecha: '',
    hora: '',
    idPaciente: 0,
    idMedico: 0,
    motivoConsulta: '',
    horaCita: 0,
  };

  apiService = inject(ApiService);
  citaService = inject(CitasService);
  categoriaService = inject(CategoriasService);
  horarioService = inject(HorariosService);

  ngOnInit(): void {
    this.getEspecialidades();
    this.getHorarios();
    this.getCitas();
  }

  //servicio de especialidades DB
  getEspecialidades() {
    this.categoriaService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.data;
      console.log(this.especialidades);
    });
  }

  //servicio de horarios DB
  getHorarios() {
    this.horarioService.getHorarios().subscribe((data: any) => {
      this.horarios = data.data;
      console.log(this.horarios);
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
      console.log(this.citas);
    });
  }

  //Funciones de acciones para todos los grupos
  editar(id: number, item: any) {
    item.isEditable = true;
    console.log('Editar: ' + id);
  }

  //guardar Horario
  guardarHorario(horario: Horario) {
    horario.isEditable = false;
    //falta el PUT
  }

  //guardar Categoria
  guardarCategoria(categoria: Categoria) {
    categoria.isEditable = false;
    //falta el PUT
  }

  cancelar(item: any) {
    item.isEditable = false;
    console.log('Cancelar: ');
  }

  eliminar(id: number) {
    console.log('Eliminar: ' + id);
  }

  verPorSuId(dataId: any) {
    console.log('Item seleccionado: ' + dataId);
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
}
