import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { ApiProviderService } from '../../services/api-provider.service';
import { FilterPipe } from '../../services/filter.pipe';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [
    RouterLink,
    NavbarusuariologueadoComponent,
    FooterComponent,
    FormsModule,
    FilterPipe
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent implements OnInit {
  vistaHeader = true;
  section: string = '';
  usuarios: Object[] = [];
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiServicr: ApiProviderService,
    private router: Router
  ) {}

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
