import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FilterPipe } from '../../services/filter.pipe';
import { ApiProviderService } from '../../services/api-provider.service';
import { Rol } from '../../interfaces/api';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-usuarios',
  standalone: true,
  imports: [
    FilterPipe,
    NavbarusuariologueadoComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './buscar-usuarios.component.html',
  styleUrl: './buscar-usuarios.component.css',
})
export class BuscarUsuariosComponent implements OnInit {
  vistaHeader = true;
  section: string = '';
  usuarios: any[] = [];
  medicos: any[] = [];
  fusionados: any[] = [];
  roles: Rol[] = [];
  query: string = '';
  rolSeleccionado: string = '';
  usuariosFiltrados: any[] = [];

  route = inject(ActivatedRoute);
  router = inject(Router);
  apiServicr = inject(ApiProviderService);
  apiService = inject(ApiService);

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
    this.apiService.getMedicos().subscribe((data: any) => {
      this.medicos = data.data.map((medico: any) => {
        return {
          ...medico.idUsuarioNavigation,
          ...medico,
        };
      });
      this.fusionarTodosLosUsuarios();
    });
  }

  fusionarTodosLosUsuarios() {
    this.fusionados = [...this.usuarios, ...this.medicos];
  }

  getRoles() {
    this.apiService.getRoles().subscribe((data: any) => {
      this.roles = data.data;
      localStorage.setItem('roles', JSON.stringify(this.roles));
      console.log(this.roles);
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
          user.nombre.toLowerCase().includes(this.query.toLowerCase()) ||
          user.apellido.toLowerCase().includes(this.query.toLowerCase()) ||
          user.dni.includes(this.query) ||
          user.email.toLowerCase().includes(this.query.toLowerCase())
      );
    }
    if (this.rolSeleccionado) {
      usuariosFiltrados = usuariosFiltrados.filter(
        (user) => user.idRol.toString() === this.rolSeleccionado
      );
    }
    this.usuariosFiltrados = usuariosFiltrados;
  }

  verTurnoDetalle(id: number) {
    // this.router.navigate(['/ficha_paciente/', id]);
    console.log('usuario id seleccionado: ', id);
  }
}
