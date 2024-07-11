import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';

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
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }

  verDatos(form: NgForm) {
    if (form.valid) {
      const datos = form.value;
      confirm(`Email: ${datos.email} \nContraseña: ${datos.contrasenia}`);
      this.loginTemporal(datos);
    } else {
      alert('Por favor, completa todos los campos.');
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
      console.log('Login de usuario exitoso');
      this.router.navigate(['/home_usuario']);
    } else if (
      datos.email === medico.email &&
      datos.contrasenia === medico.contrasenia
    ) {
      console.log('Login de medico exitoso');
      this.router.navigate(['/home_usuario']); // Cambiar a home_medico despues
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
