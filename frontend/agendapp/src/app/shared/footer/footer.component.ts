import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }
}
