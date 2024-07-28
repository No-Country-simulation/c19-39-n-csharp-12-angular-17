import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FilterPipe } from '../../services/filter.pipe';
import { ApiService } from '../../services/api.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ModalVerdetalleusuarioComponent } from '../../shared/modal-verdetalleusuario/modal-verdetalleusuario.component';

import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    FilterPipe,
    NavbarusuariologueadoComponent,
    FooterComponent,
    ModalVerdetalleusuarioComponent,
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent implements OnInit {
  usuarios: Object[] = [];
  query: string = '';
  datos: any = {};

  //Elementos para acceder al ID del modal y con el que 'abrimos' el modal en el componente padre
  @ViewChild(ModalVerdetalleusuarioComponent)
  modaldetalleusuario: ModalVerdetalleusuarioComponent =
    new ModalVerdetalleusuarioComponent();

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.verUsuarios();
      }

  verUsuarios() {
    this.apiService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data.data;
    });
  }

  verTurnoDetalle(id: number) {
    this.apiService.getUsuarioByID(id).subscribe(
      (data: any) => {
        this.datos = data.data;
        // console.log('Datos del usuario: ', this.datos);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  //Acciones sobre los modales
  abrirModalEditarUsuario() {
    const modal = document.getElementById('modaldetalleusuario');
    if (modal) {
      const instanciaModal = new bootstrap.Modal(modal);
      instanciaModal.show();
    }
  }

}
