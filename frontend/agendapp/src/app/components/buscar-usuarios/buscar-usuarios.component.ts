import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FilterPipe } from '../../services/filter.pipe';
import { ApiProviderService } from '../../services/api-provider.service';
import { Rol } from '../../interfaces/api';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MedicosService } from '../../services/medicos.service';
import { Medico } from '../../interfaces/medico';
import { Usuario } from '../../interfaces/usuario';
import { ModalEditarusuarioComponent } from '../../shared/modal-editarusuario/modal-editarusuario.component';
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
  section: string = '';
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  fusionados: any[] = [];
  roles: Rol[] = [];
  query: string = '';
  rolSeleccionado: string = '';
  usuariosFiltrados: any[] = [];

  //Elementos para acceder al ID del modal y con el que 'abrimos' el modal en el componente padre
  @ViewChild(ModalEditarusuarioComponent)
  modaleditarusuario: ModalEditarusuarioComponent =
    new ModalEditarusuarioComponent();

  route = inject(ActivatedRoute);
  router = inject(Router);
  apiServicr = inject(ApiProviderService);
  apiService = inject(ApiService);
  medicoService = inject(MedicosService);

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.getUsuarios();
    this.getMedicos();
    this.getRoles();
  }

  getUsuarios() {
    this.apiService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data.data;
      this.fusionarTodosLosUsuarios();
    });
  }

  getMedicos() {
    this.medicoService.getMedicosDataUsuario().subscribe((data: any) => {
      this.medicos = data;
      this.fusionarTodosLosUsuarios();
    });
  }

  fusionarTodosLosUsuarios() {
    this.fusionados = [...this.usuarios, ...this.medicos];
    console.log(this.fusionados);
  }

  getRoles() {
    this.apiService.getRoles().subscribe((data: any) => {
      this.roles = data.data;
      //guardo en localstorage para usar en otros componentes
      localStorage.setItem('roles', JSON.stringify(this.roles));
      //console.log(this.roles);
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
      usuariosFiltrados = usuariosFiltrados.filter(
        (user) => user.idRol && user.idRol.toString() === this.rolSeleccionado
      );
    }
    this.usuariosFiltrados = usuariosFiltrados;
  }

  verTurnoDetalle(id: number) {
    // this.router.navigate(['/ficha_paciente/', id]);
    console.log('usuario id seleccionado: ', id);
  }

  //Editar usuario seleccionado
  editarUsuario(id: number, item: any) {
    item.isEditable = true;
    console.log('Editar: ' + id);
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
    console.log('Usuario editado ' + event);
    this.getUsuarios();
    this.getMedicos();
  }
}
