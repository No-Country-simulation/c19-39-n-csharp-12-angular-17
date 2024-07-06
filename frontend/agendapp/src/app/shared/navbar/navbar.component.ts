import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes

  constructor(private route: ActivatedRoute) {  
  }

  ngOnInit(): void {   
    this.section = this.route.snapshot.routeConfig?.path || '';
  }
}
