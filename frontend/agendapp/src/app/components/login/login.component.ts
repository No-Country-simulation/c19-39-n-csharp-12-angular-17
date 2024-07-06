import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  vistaHeader = true; //para ver el header condicionalmente
  role: string = '';


  constructor(private route: ActivatedRoute, private router: Router) {
    this.role = this.route.snapshot.routeConfig?.path || '';
  
  }

  ngOnInit(): void {
    console.log(this.role);
  }

  irHacia(role: string){
    this.role = role;
    window.location
  }

}
