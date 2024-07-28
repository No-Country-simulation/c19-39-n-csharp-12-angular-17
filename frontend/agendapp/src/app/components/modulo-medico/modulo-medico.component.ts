import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterPipe } from '../../services/filter.pipe';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { ApiService } from '../../services/api.service';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { MedicosService } from '../../services/medicos.service';

import { Medico } from '../../interfaces/medico';
import { Usuario } from '../../interfaces/usuario';
import { Cita } from '../../interfaces/cita';

@Component({
  selector: 'app-modulo-medico',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    FormsModule,
    FilterPipe,
    CommonModule,
  ],
  templateUrl: './modulo-medico.component.html',
  styleUrl: './modulo-medico.component.css',
})
export class ModuloMedicoComponent implements OnInit {
  citas: any[] = [];
  cita: any = {};
  usuario = {} as Usuario;
  medicoLogueado = {} as Medico;
  idMedico: number = 0;
  query: string = '';
  botonActivo: string = 'proximos';

  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private citaService = inject(CitasService);
  private medicoService = inject(MedicosService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.getUsuario();
    this.getMedicoById();
  }

  setActivo(nombreBoton: string) {
    this.botonActivo = nombreBoton;
  }

  //Obtener el usuario (payload del login)
  getUsuario(): void {
    this.authService.usuario$.subscribe((usuario) => {
      console.log('Usuario:', usuario);
      if (usuario) {
        this.usuario = usuario;
      } else {
        console.log('No hay usuario logueado');
      }
    });
  }

  //Obtener el idMedico desde la lista de medicos
  getMedicoById() {
    this.medicoService.getMedicos().subscribe((data: any) => {
      this.medicoLogueado = data.find(
        (medico: Medico) => medico.idUsuario === this.usuario.idUsuario
      );
      if (this.medicoLogueado) {
        this.idMedico = this.medicoLogueado.idMedico;
        // console.log('idMedico:', this.idMedico);
        this.getCitasMedico(this.idMedico);
      }
    });
  }

  //Obtener turnos del LS
  private getCitasMedico(id: number) {
    this.citaService.getCitasByMedico(id).subscribe((data: any) => {
      this.citas = data.data;
      if (!this.citas) {
        console.log('No hay citas');
      } else {
        // console.log('Citas:', this.citas);
        this.citas.forEach((cita: Cita, index: number) => {
          this.filterIdPaciente(cita.idPaciente, index);
        });
      }
    });
  }

  private filterIdPaciente(id: number, index: number) {
    this.apiService.getUsuarioByID(id).subscribe((data: any) => {
      if (data.success && data.data) {
        this.citas[index].paciente = data.data;
        // console.log(`Paciente ${index + 1}:`, data.data);
      } else {
        console.log(`No se encontró información para el paciente con id ${id}`);
      }
    });
  }

  iniciarVideoConsulta(idCita: number) {
    // console.log('Iniciar video consulta', idCita);
    this.router.navigate(['/videollamada']);
  }

}
