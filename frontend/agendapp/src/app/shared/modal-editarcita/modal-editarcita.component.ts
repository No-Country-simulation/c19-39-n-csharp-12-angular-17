import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Cita } from '../../interfaces/cita';
import { CitasService } from '../../services/citas.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-editarcita',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-editarcita.component.html',
  styleUrl: './modal-editarcita.component.css',
})
export class ModalEditarcitaComponent {
  @Output() citaEditada = new EventEmitter<Cita>();

  cita: Cita = {
    idCita: 0,
    fecha: '',
    hora: '',
    idPaciente: 0,
    idMedico: 0,
    motivoConsulta: '',
    horaCita: 0,
  };

  private citaService = inject(CitasService);
  private route = inject(ActivatedRoute); //capturar el id del param

  constructor() {}

  //!!Edita una cita en la base de datos
  editarCita(form: NgForm) {
    const datos = form.value;
    console.log(datos);
    if (form.valid) {
      this.citaService.putCita(datos).subscribe((data: any) => {
        console.log(data);
        this.citaEditada.emit(data);
        form.resetForm();
      });
    }
  }
}
