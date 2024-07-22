import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { ApiProviderService } from '../../services/api-provider.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Categoria } from '../../interfaces/api';
import { ApiService } from '../../services/api.service';
import { CategoriasService } from '../../services/categorias.service';
import { MedicosService } from '../../services/medicos.service';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent, FooterComponent],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css',
})
export class EspecialidadesComponent implements OnInit {
  section: string = ''; //registro_medicos o registro_pacientes
  especialidades: Categoria[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriasService,
    private router: Router
  ) {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  verEspecialidadDetalle(id: number) {
    console.log(id);
    this.router.navigate(['/especialidad/', id]);
  }


  getEspecialidades() {
    const categoryImageMap: { [key: string]: string } = {
      Cardiología: '../../../assets/img/cardiology.svg',
      Dermatología: '../../../assets/img/dermatology.svg',
      Endocrinología: '../../../assets/img/endocrinology.png',
      Gastroenterología: '../../../assets/img/gastroenterology.png',
      Geriatría: '../../../assets/img/geriatrics.png',
    };

    this.categoriaService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.data.map((especialidad: Categoria) => {
        const imgSrc =
          categoryImageMap[especialidad.nombre] ||
          '../../../assets/img/logo.png';

        return {
          idCategoria: especialidad.idCategoria,
          nombre: especialidad.nombre,
          imgSrc: imgSrc,
        };
      });
    });
  }
}
