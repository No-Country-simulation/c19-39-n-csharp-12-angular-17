import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { Medico } from '../../interfaces/medico';
import { ApiProviderService } from '../../services/api-provider.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
// import { Especialidad } from '../../interfaces/api';
// import { RegistroService } from '../../services/registro.service';

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
  especialidades: any[] = [];


  private Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  user: any = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasenia: '',
    dni: '',
  };

  constructor(
    private route: ActivatedRoute,
    private apiServiceProvider: ApiProviderService,
    private router: Router
  ) // private registroService: RegistroService
  {
    this.role = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    console.log(this.role);
    this.rellenarDatosFalsos(this.role);
    this.getEspecialidades();
  }


  verDatos(form: NgForm) {
    if (form.valid) {
      const datos = form.value;
      this.Toast.fire({
        icon: "success",
        title:`Nombre: ${datos.nombre} \nApellido: ${datos.apellido} \nEmail: ${datos.email} \nContraseña: ${datos.contrasenia} \nLicencia: ${datos.licenciaMedica} \nEspecialidad: ${datos.especialidad}`
      });
      this.enviarRegistro(form);
    } else {
      Swal.fire({
        icon: "warning",
        title: 'Por favor, completa todos los campos.',
        showConfirmButton: false,
      });
    }
  }

  //servicio de especialidades DB
  getEspecialidades() {
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
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        email: form.value.email,
        telefono: form.value.telefono,
        dni: form.value.dni,
        contrasenia: form.value.contrasenia,
        rol: { idRol: 3 },
        id: 1
      };
      console.log(usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate(['/login_usuarios']);
      form.reset();
    } else if (form.valid && this.role === 'registro_medicos') {
      //objeto medico
      const medico = {
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        email: form.value.email,
        telefono: form.value.telefono,
        dni: form.value.dni,
        contrasenia: form.value.contrasenia,
        licenciaMedica: form.value.licenciaMedica,
        especialidad: form.value.especialidad,
        rol: { idRol: 2 },
        id: 2
      };
      localStorage.setItem('medico', JSON.stringify(medico));
      this.router.navigate(['/login_medicos']);
      form.reset();
    } else {
      Swal.fire({
        icon: "warning",
        title: 'Por favor, completa todos los campos.',
        showConfirmButton: false,
      });
    }
  }
}
