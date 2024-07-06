import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  vistaHeader = true; //para ver el header condicionalmente
  role: string = '';

  user: any = {
    email: '',   
    contrasenia: ''   
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.role = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    console.log(this.role);
  }

  irHacia(role: string) {
    this.role = role;
    window.location;
  }

  verDatos(form: NgForm) {
    if (form.valid) {
      const datos = form.value;
      confirm(
        `Email: ${datos.email} \nContraseña: ${datos.contrasenia}`
      );
      form.reset();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
