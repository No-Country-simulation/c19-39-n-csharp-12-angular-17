import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  vistaHeader = true;
  section: string = '';

  private Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  constructor(private route: ActivatedRoute, private router: Router) {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }

  verDatos(form: NgForm) {
    if (form.valid) {
      const datos = form.value;
      // todo hide the data
      this.Toast.fire({
        icon: "info",
        title:`Email: ${datos.email} \nContraseña: ${datos.contrasenia}`,
        showConfirmButton:true,
        timer:3000,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      this.loginTemporal(datos);
    } else {
      Swal.fire({
        title: "Por favor, completa todos los campos.",
        icon: "error"
      });
    }
  }


  //servicio de login del LS
  loginTemporal(datos: any) {
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    let medico = JSON.parse(localStorage.getItem('medico') || '{}');

    if (
      datos.email === usuario.email &&
      datos.contrasenia === usuario.contrasenia
    ) {
      this.Toast.fire({
        icon: "success",
        title: 'Login de usuario exitoso',
      });
      this.router.navigate(['/home_usuario']);
    } else if (
      datos.email === medico.email &&
      datos.contrasenia === medico.contrasenia
    ) {
      console.log('Login de medico exitoso');
      this.Toast.fire({
        icon: "success",
        title: 'Login de medico exitoso',
      });
      this.router.navigate(['/home_usuario']); // Cambiar a home_medico despues
    } else {
      Swal.fire({
        title:'Credenciales incorrectas'
      })
    }
  }
}
