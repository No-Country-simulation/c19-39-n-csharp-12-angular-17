import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-modulo-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './modulo-usuario.component.html',
  styleUrl: './modulo-usuario.component.css',
})
export class ModuloUsuarioComponent implements OnInit {
  vistaHeader = true; //para ver el header condicionalmente
  section: string = ''; //registro_medicos o registro_pacientes

  medicos: any[] = [
    {
      nombre: 'Juan',
      apellido: 'Perez',
      especialidad: 'Oftalmologia',
      cita: [
        {
          idCita: 1,
          fecha: '2024-07-05',
          hora: '10:00',
          idPaciente: 1,
          idMedico: 1,
          motivoConsulta: 'Dolor de pecho',
          id: '2e78',
        },
      ],
    },
    {
      nombre: 'Romina',
      apellido: 'Gomez',
      especialidad: 'Cardiologia',
      cita: [
        {
          idCita: 2,
          fecha: '2024-07-05',
          hora: '12:00',
          idPaciente: 1,
          idMedico: 2,
          motivoConsulta: 'Dolor de pecho',
          id: '2e78',
        },
      ],
    },
  ];

  //temporal
  nombreUsuario: string = 'Maria';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
  }
}
