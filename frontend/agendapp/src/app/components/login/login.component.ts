import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { SweetAlertService } from '../../services/alerts/sweet-alert.service';
import { AuthService } from '../../services/auth.service';

import { NavbarComponent } from '../../shared/navbar/navbar.component';
import Swal from 'sweetalert2';

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

  password: string = '';
  isPasswordVisible: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  sweetService = inject(SweetAlertService);

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.section = this.route.snapshot.routeConfig?.path || '';
    });
  }

  login(form: NgForm) {
    const datos = form.value;
    if (form.valid) {
      this.loginService.login(datos).subscribe(
        (data: any) => {
          if (data.status === 200) {
            this.sweetService.Toast.fire({
              icon: 'success',
              title: 'Login exitoso.',
              timer: 2000,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            const usuario = data.data;
            this.authService.setUsuario(usuario);
            setTimeout(() => {
              switch (usuario.idRol) {
                case 1:
                  this.router.navigate(['/home_usuario']);
                  break;
                case 2:
                  this.router.navigate(['/home_medico']);
                  break;
                case 3:
                  this.router.navigate(['/admin']);
                  break;
                default:
                  this.sweetService.alert('Rol desconocido');
                  this.router.navigate(['/']);
                  break;
              }
            }, 1500);
            
          } else {
            this.sweetService.alert('Credenciales incorrectas');
          }
        },
        (error) => {
          this.sweetService.error('Error en el servicio de login.');
          console.error(error);
        }
      );
    } else {
      this.sweetService.alert('Completa los campos.');
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
