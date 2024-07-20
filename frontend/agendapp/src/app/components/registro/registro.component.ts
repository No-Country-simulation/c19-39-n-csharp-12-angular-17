import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiProviderService } from '../../services/api-provider.service';
import { RegistroService } from '../../services/registro.service';
import { Categoria, Horario } from '../../interfaces/api';
import { MedicoRegister, UsuarioRegister } from '../../interfaces/auth';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  vistaHeader = true;
  section: string = '';
  especialidades: Categoria[] = [];
  horarios: Horario[] = [];

  user: UsuarioRegister = {
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
  };

  medico: MedicoRegister = {
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    idCategoria: 0,
    idHorario: 0,
  };

  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  apiServiceProvider = inject(ApiProviderService);
  router = inject(Router);
  registroService = inject(RegistroService);

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.section);
    this.getEspecialidades();
    this.getHorarios();
  }

  //servicio de especialidades JS
  getEspecialidades() {
    this.apiServiceProvider.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data;
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

  enviarRegistroUsuario(form: NgForm) {
    if (form.valid) {
      const usuario = {
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        email: form.value.email,
        telefono: form.value.telefono,
        dni: form.value.dni,
        password: form.value.password,
      };
      console.log(usuario);
      this.registroService
        .registrarUsuario(usuario)
        .subscribe((data: UsuarioRegister) => {
          console.log(data);
        });
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate(['/login_usuarios']);
      form.reset();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  enviarRegistroMedico(form: NgForm) {
    if (form.valid) {
      const medico = {
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        email: form.value.email,
        telefono: form.value.telefono,
        dni: form.value.dni,
        password: form.value.password,
        idCategoria: form.value.idCategoria,
        idHorario: form.value.idHorario,
      };
      this.registroService
        .registrarMedico(medico)
        .subscribe((data: MedicoRegister) => {
          console.log(data);
        });
      localStorage.setItem('medico', JSON.stringify(medico));
      this.router.navigate(['/login_medicos']);
      form.reset();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
