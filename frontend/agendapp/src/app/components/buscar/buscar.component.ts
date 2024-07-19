import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ApiProviderService } from '../../services/api-provider.service';
import { FilterPipe } from '../../services/filter.pipe';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    FilterPipe,
    NavbarusuariologueadoComponent,
    FooterComponent,
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent implements OnInit {
  vistaHeader = true;
  section: string = '';
  usuarios: Object[] = [];
  query: string = '';

  route = inject(ActivatedRoute);
  router = inject(Router);
  apiServicr = inject(ApiProviderService);

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.verUsuarios();
  }

  verUsuarios() {
    this.apiServicr.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data);
    });
  }

  verTurnoDetalle(id: number) {
    this.router.navigate(['/ficha_paciente/', id]);
  }
}
