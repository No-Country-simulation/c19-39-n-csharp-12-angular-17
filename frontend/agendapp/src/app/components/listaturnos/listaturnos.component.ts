import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { Cita } from '../../interfaces/api';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-listaturnos',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent, FooterComponent],
  templateUrl: './listaturnos.component.html',
  styleUrl: './listaturnos.component.css',
})
export class ListaturnosComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes
  citas: any[] = [];
  cita: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiProviderService: ApiProviderService,
    private localServicr: LocalStorageService,
    private router: Router
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    // this.getCitas();
    this.obtenerListaTurnos();
  }

  verCita(index: number | string) {
    const id = index;
    // const id = this.citas[0].idCita;
    this.router.navigate(['/turno/' + id]);
  }


  //Obtener citas DB
  getCitas() {
    this.apiProviderService.getCitas().subscribe((data: any) => {
      console.log(data);
      this.citas = data;
    });
  }

 

  //Obtener citas LS
  obtenerListaTurnos() {
    this.citas = this.localServicr.obtenerListaTurnos();
    console.log(this.citas);
  }
}
