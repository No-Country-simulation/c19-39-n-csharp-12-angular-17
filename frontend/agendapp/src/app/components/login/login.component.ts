import { Component, inject, OnInit } from '@angular/core';
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

  route = inject(ActivatedRoute);
  router = inject(Router);
  loginService = inject(LoginService);

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.section = this.route.snapshot.routeConfig?.path || '';
      this.vistaHeader = ['login_usuarios', 'login_medicos'].includes(
        this.section
      );
    });
  }

  submit(form: NgForm) {
    if (this.section === 'login_usuarios') {
      this.loginUsuario(form);
    } else if (this.section === 'login_medicos') {
      this.loginMedicos(form);
    }
  }

  loginUsuario(form: NgForm) {
    const datos = form.value;
    if (form.valid) {
      this.loginService.loginUsuario(datos).subscribe(
        (data: any) => {
          if (data.status === 200) {
            this.router.navigate(['/home_usuario']);
          } else {
            alert('Credenciales incorrectas');
          }
          if(data.data){
            localStorage.setItem('usuario', JSON.stringify(data.data));
          }else{
            console.log('No se pudo guardar el usuario en el Local Storage');
          }
        },
        (error) => {
          alert('Error en el servicio de login');
          console.error(error);
        }
      );
    }
  }

  loginMedicos(form: NgForm) {
    const datos = form.value;
    if (form.valid) {
      this.loginService.loginUsuario(datos).subscribe(
        (data: any) => {
          if (data.status === 200) {
            this.router.navigate(['/home_medico']);
          } else {
            alert('Credenciales incorrectas');
          }
          if (data.data) {
            localStorage.setItem('medico', JSON.stringify(data.data));
          } else {
            console.log('No se pudo guardar el medico en el Local Storage');
          }
        },
        (error) => {
          alert('Error en el servicio de login');
          console.error(error);
        }
      );
    }
  }
}
