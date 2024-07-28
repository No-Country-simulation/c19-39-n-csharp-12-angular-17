import { Component, inject, OnInit } from '@angular/core';
import {RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { MedicosService } from '../../services/medicos.service';

import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { Cita } from '../../interfaces/cita';
import { Usuario } from '../../interfaces/usuario';
import { CategoriaNombrePipe } from '../../services/categoria-nombre.pipe';

@Component({
  selector: 'app-listaturnos',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    CommonModule,
    CategoriaNombrePipe
  ],
  templateUrl: './listaturnos.component.html',
  styleUrl: './listaturnos.component.css',
})
export class ListaturnosComponent implements OnInit {
  citas: Cita[] = [];
  usuario = {} as Usuario;
  botonActivo: string = 'proximos';
  // Estructura para almacenar datos de los médicos temporalmente
  private medicosMap: { [id: number]: any } = {};


  private citaService = inject(CitasService);
  private authService = inject(AuthService);
  private medicoService = inject(MedicosService);

  constructor() {
  }

  ngOnInit(): void {
    this.getUsuario();
    this.obtenerCitasByUsuario(this.usuario.idUsuario);
  }

  getUsuario(): void {
    this.authService.usuario$.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      } else {
        console.log('No hay usuario logueado');
      }
    });
  }

  setActivo(nombreBoton: string) {
    this.botonActivo = nombreBoton;
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

}




