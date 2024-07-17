import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  vistaHeader = true;
  section: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
    console.log(this.section);
  }

  ngOnInit(): void {
    if (this.section === 'login_usuarios') {
      this.vistaHeader = true;
    } else if (this.section === 'login_medicos') {
      this.vistaHeader = true;
    }
  }

  //Submit del formulario (temporal)

  //servicio de login del LS
  loginUsuario(form: NgForm) {
    const datos = form.value;
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (datos.email === usuario.email && datos.password === usuario.password) {
      console.log('Login de usuario exitoso');
      this.router.navigate(['/home_usuario']);
    } else {
      alert('Credenciales incorrectas');
    }
    console.log(usuario);
  }

  //servicio de login del LS
  loginMedicos(form: NgForm) {
    const datos = form.value;
    let medico = JSON.parse(localStorage.getItem('medico') || '{}');

    if (datos.email === medico.email && datos.password === medico.password) {
      console.log('Login de medico exitoso');
      this.router.navigate(['/home_medico']);
    } else {
      alert('Credenciales incorrectas');
    }
    console.log(medico);
  }

  //Submit del formulario (DB)
  onSubmit(form: NgForm) {
    if (form.valid) {
      const datos = form.value;
      if (this.section === 'login_usuario') {
        this.loginService.loginUsuario(datos);
      } else if (this.section === 'login_medico') {
        this.loginService.loginMedico(datos);
      }
    }
  }
}
