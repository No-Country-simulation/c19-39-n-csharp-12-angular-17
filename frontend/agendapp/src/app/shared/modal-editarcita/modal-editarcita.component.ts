import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cita } from '../../interfaces/cita';
import { CitasService } from '../../services/citas.service';
import { HorariosService } from '../../services/horarios.service';
import { Horario } from '../../interfaces/api';

@Component({
  selector: 'app-modal-editarcita',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-editarcita.component.html',
  styleUrl: './modal-editarcita.component.css',
})
export class ModalEditarcitaComponent implements AfterViewInit {
  @Output() citaEditada = new EventEmitter<Cita>();
  @Input() datoEntrada: any;
  horarios: Horario[] = [];

  cita: Cita = {
    idCita: 0,
    fecha: '',
    hora: '',
    idPaciente: 0,
    idMedico: 0,
    motivoConsulta: '',
  };

  private citaService = inject(CitasService);
  private horarioService = inject(HorariosService);

  constructor() {
    if (this.datoEntrada) {
      this.cita = { ...this.datoEntrada };
    }
  }

  ngAfterViewInit() {
    this.obtenerHorarios();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datoEntrada'] && this.datoEntrada) {
      this.cita = { ...this.datoEntrada };
    }
  }

  editarCita(form: NgForm) {
    if (form.valid) {
      this.citaService.putCita(this.cita).subscribe((data: Cita) => {
        this.citaEditada.emit(data);
        form.resetForm();
      });
    }
  }

  //Obtener horarios de la DB
  obtenerHorarios() {
    this.horarioService.getHorarios().subscribe((data: any) => {
      this.horarios = data.data;
    });
  }
}
