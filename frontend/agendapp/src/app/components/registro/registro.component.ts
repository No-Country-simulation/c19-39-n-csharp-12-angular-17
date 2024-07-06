import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  vistaHeader = true; //para ver el header condicionalmente
  role: string = '';

  constructor(private route: ActivatedRoute) {
    this.role = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    console.log(this.role);
  }

  irHacia(role: string) {
    this.role = role;
    window.location;
  }
}
