import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { SweetAlertService } from '../../services/alerts/sweet-alert.service';
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

  route = inject(ActivatedRoute);
  router = inject(Router);
  loginService = inject(LoginService);
  sweetService = inject(SweetAlertService);

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.section = this.route.snapshot.routeConfig?.path || '';
    });
  }


  login(form: NgForm) {
    const datos = form.value;
    if (form.valid) {
      this.loginService.loginUsuario(datos).subscribe(
        (data: any) => {
          if (data.status === 200) {
            this.sweetService.Toast.fire({
              icon: "success",
              title: "Login exitoso.",
              timer:2000,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            this.router.navigate(['/home_usuario']);
          } else {
            this.sweetService.alert("Credenciales incorrectas");
          }
          if(data.data){
            localStorage.setItem('usuario', JSON.stringify(data.data));
          }else{
            console.log('No se pudo guardar el usuario en el Local Storage');
          }
        },
        (error) => {
          this.sweetService.error("Error en el servicio de login.")
          console.error(error);
        }
      );
    }else{
      this.sweetService.alert("Completa los campos.")
    }
  }

  // loginMedicos(form: NgForm) {
  //   const datos = form.value;
  //   if (form.valid) {
  //     this.loginService.loginUsuario(datos).subscribe(
  //       (data: any) => {
  //         if (data.status === 200) {
  //           this.router.navigate(['/home_medico']);
  //           this.sweetService.Toast.fire({
  //             icon: "success",
  //             title: "Login exitoso.",
  //             timer:2000,
  //             didOpen: (toast) => {
  //               toast.onmouseenter = Swal.stopTimer;
  //               toast.onmouseleave = Swal.resumeTimer;
  //             }
  //           });
  //         } else {
  //           this.sweetService.error('Credenciales incorrectas');
  //           // alert('Credenciales incorrectas');
  //         }
  //         if (data.data) {
  //           localStorage.setItem('medico', JSON.stringify(data.data));
  //         } else {
  //           console.log('No se pudo guardar el medico en el Local Storage');
  //         }
  //       },
  //       (error) => {
  //         this.sweetService.alert('Error en el servicio de login')
  //         // alert('Error en el servicio de login');
  //         console.error(error);
  //       }
  //     );
  //   }else{
  //     this.sweetService.alert("Completa los campos.")
  //   }
  // }
}
