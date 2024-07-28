import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { MedicosService } from '../../services/medicos.service';

import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ModalEditarusuarioComponent } from '../../shared/modal-editarusuario/modal-editarusuario.component';

import { Medico } from '../../interfaces/medico';
import { Usuario } from '../../interfaces/usuario';
import { Rol } from '../../interfaces/api';
import { FilterPipe } from '../../services/filter.pipe';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-buscar-usuarios',
  standalone: true,
  imports: [
    FilterPipe,
    NavbarusuariologueadoComponent,
    FooterComponent,
    FormsModule,
    ModalEditarusuarioComponent,
  ],
  templateUrl: './buscar-usuarios.component.html',
  styleUrl: './buscar-usuarios.component.css',
})
export class BuscarUsuariosComponent implements OnInit {
  vistaHeader = true;
  usuarios: Usuario[] = [];
  medico: any;
  medicos: Medico[] = [];
  medicosFiltrados: any[] = [];
  fusionados: any[] = [];
  roles: Rol[] = [];
  query: string = '';
  rolSeleccionado: string = '';
  usuariosFiltrados: any[] = [];
  datos: any = {};

  //Elementos para acceder al ID del modal y con el que 'abrimos' el modal en el componente padre
  @ViewChild(ModalEditarusuarioComponent)
  modaleditarusuario: ModalEditarusuarioComponent =
    new ModalEditarusuarioComponent();

  private apiService = inject(ApiService);
  private medicoService = inject(MedicosService);

  ngOnInit(): void {
    this.getUsuarios();
    this.getMedicos();
    this.getRoles();
  }

  getUsuarios() {
    this.apiService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data.data;
      // console.log(this.usuarios);
      this.fusionarTodosLosUsuarios();
    });
  }

  getMedicos() {
    this.medicoService.getMedicos().subscribe((data: any) => {
      this.medicos = data;
      // console.log(this.medicos);
      this.medicos.filter((medico) => {
        this.medico = medico.idMedico;
      });
      this.medicos.filter((medico) => {
        this.medicosFiltrados.push(medico.idUsuarioNavigation);
      });
      this.fusionarTodosLosUsuarios();
    });
  }

  fusionarTodosLosUsuarios() {
    this.fusionados = [...this.usuarios, ...this.medicosFiltrados];
    // console.log(this.fusionados);
  }

  //Obtener los roles de la DB para filtrar busqueda
  getRoles() {
    this.apiService.getRoles().subscribe((data: any) => {
      this.roles = data.data;
    });
  }

  onRoleChange(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let usuariosFiltrados = this.fusionados;
    if (this.query) {
      usuariosFiltrados = usuariosFiltrados.filter(
        (user) =>
          user.nombre?.toLowerCase().includes(this.query.toLowerCase()) ||
          user.apellido?.toLowerCase().includes(this.query.toLowerCase()) ||
          user.dni?.includes(this.query) ||
          user.email?.toLowerCase().includes(this.query.toLowerCase())
      );
    }
    if (this.rolSeleccionado) {
      console.log('Rol seleccionado: ', this.rolSeleccionado);
      usuariosFiltrados = usuariosFiltrados.filter(
        (user) => user.idRol && user.idRol.toString() === this.rolSeleccionado
      );
    }
    this.usuariosFiltrados = usuariosFiltrados;
  }

  //Editar usuario seleccionado
  verUsuario(id: number) {
    console.log('Usuario seleccionado: ', id);
    this.datos = this.usuariosFiltrados.find((user) => user.idUsuario === id);
    // console.log('Datos del usuario: ', this.datos);
    this.abrirModalEditarUsuario();
  }

  //Acciones sobre los modales
  abrirModalEditarUsuario() {
    const modal = document.getElementById('modaleditarusuario');
    if (modal) {
      const instanciaModal = new bootstrap.Modal(modal);
      instanciaModal.show();
    }
  }

  usuarioEditadoHandler(event: Usuario) {
    console.log('Usuario editado ' + JSON.stringify(event));
    this.getUsuarios();
    this.getMedicos();
  }
}
