import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Categoria, Cita, Horario } from '../../interfaces/api';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, NavbarusuariologueadoComponent, FooterComponent, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  horarios: Horario[] = [];
  especialidades: Categoria[] = [];
  citas: Cita[] = [];
  isEditable = false;

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

  ngOnInit(): void {
    this.getEspecialidades();
    this.getHorarios();
    this.getCitas();
  }

  //servicio de especialidades DB
  getEspecialidades() {
    this.apiService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.data;
      console.log(this.especialidades);
    });
  }

  //servicio de horarios DB
  getHorarios() {
    this.apiService.getHorarios().subscribe((data: any) => {
      this.horarios = data.data;
      console.log(this.horarios);
    });
  }

  //servicio de citas DB
  getCitas() {
    this.apiService.getCitas().subscribe((data: any) => {
      this.citas = data.data.map((cita: any) => {
        return {
          ...cita,
          medico: {
            ...cita.idMedicoNavigation.idUsuarioNavigation,
            ...cita.idMedicoNavigation,
          },
          paciente: {
            ...cita.idPacienteNavigation.idUsuarioNavigation,
            ...cita.idPacienteNavigation,
          },
        };
      });
      console.log(this.citas);
    });
  }

  //Funciones de los select

  buscarHorarioId(form: NgForm) {
    if (form.valid) {
      const idHorario = form.value.idHorario;
      console.log('Dato seleccionado del select horario' + idHorario);
    }
  }

  editarHorario(hora: any) {
    debugger;
    this.horarios.forEach((e: any) => {
      e.isEditable = false;
    });
    hora.isEditable = true;
  }

  agregarHorario() {
    const obj = {
      idHorario: 22,
      rango: '',
      isEditable: true,
    };
    this.horarios.unshift(obj);
  }

  eliminarHorario(hora: any) {
    this.horarios = this.horarios.filter(
      (e: any) => e.idHorario !== hora.idHorario
    );
  }

  buscarEspecialidadId(form: NgForm) {
    if (form.valid) {
      const idHorario = form.value.idHorario;
      console.log('Dato seleccionado del select horario' + idHorario);
    }
  }

  editarEspecialidad(especialidad: any) {
    debugger;
    this.especialidades.forEach((e: any) => {
      e.isEditable = false;
    });
    especialidad.isEditable = true;
  }

  agregarEspecialidad() {
    const obj = {
      idCategoria: 22,
      nombre: '',
      imgSrc: '',
      isEditable: true,
    };
    this.especialidades.unshift(obj);
  }

  eliminarEspecialidad(especialidad: any) {
    this.especialidades = this.especialidades.filter(
      (e: any) => e.idCategoria !== especialidad.idCategoria
    );
  }

  buscarCitaId(form: NgForm) {
    if (form.valid) {
      const idHorario = form.value.idHorario;
      console.log('Dato seleccionado del select horario' + idHorario);
    }
  }
}
