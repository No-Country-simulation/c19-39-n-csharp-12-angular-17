import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { Medico } from '../../interfaces/medico';
import { ApiProviderService } from '../../services/api-provider.service';
import { Especialidad } from '../../interfaces/api';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  vistaHeader = true; //para ver el header condicionalmente
  role: string = '';
  //Modelos de datos (hardcodeados para pruebas)
  usuario: Usuario = {} as Usuario;
  medico: Medico = {} as Medico;
  especialidades: Especialidad[] = [];

  user: any = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasenia: '',
    dni: ''
  };

  constructor(
    private route: ActivatedRoute,
    private apiServiceProvider: ApiProviderService
  ) {
    this.role = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    console.log(this.role);
    this.rellenarDatosFalsos(this.role);
    this.obtenerEspecialidad();
  }

  irHacia(role: string) {
    this.role = role;
    window.location; //recarga la página para cambiar la url, el componente es el mismo y el render es condicional.
  }

  verDatos(form: NgForm) {
    if (form.valid) {
      const datos = form.value;
      confirm(
        `Nombre: ${datos.nombre} \nApellido: ${datos.apellido} \nEmail: ${datos.email} \nContraseña: ${datos.contrasenia} \nLicencia: ${datos.licenciaMedica} \nEspecialidad: ${datos.especialidad}`
      );
      form.reset();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  obtenerEspecialidad() {
    this.apiServiceProvider.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data;
      console.log(this.especialidades);
    });
  }

  //funcion temporal
  rellenarDatosFalsos(rol: string) {
    if (rol === 'registro_usuarios') {
      this.user = {
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juan@email.com',
        telefono: '555-5555',
        contrasenia: 'usuario123',
        dni: '12345678',
      };
    } else {
      this.user = {
        nombre: 'Danilo',
        apellido: 'Ramirez',
        email: 'dr@email.com',
        telefono: '777-7777',
        contrasenia: 'medico123',
        dni: '87654321',
      };
    }
  }

  enviarRegistro(form: any) {
    //objeto usuario/paciente
    if (form.valid && this.role === 'registro_usuarios') {
      const usuario = {
        ...this.usuario,
        rol: { idRol: 3 },
      };
      this.guardarDatosLocalStorage(usuario);
    } else if (form.valid && this.role === 'registro_medicos') {
      //objeto medico
      const medico = {
        ...this.medico,
        rol: { idRol: 2 },
      };
      this.guardarDatosLocalStorage(medico);
    }else{
      alert('Por favor, completa todos los campos.');
    }
  }

  //Enviar datos al localsotrage
  guardarDatosLocalStorage(usuario: any) {
    this.apiServiceProvider.guardarUsuario(usuario);
  }
}
