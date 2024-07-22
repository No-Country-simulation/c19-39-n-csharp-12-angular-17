import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Horario } from '../../interfaces/api';
import { HorariosService } from '../../services/horarios.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-horario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-horario.component.html',
  styleUrl: './modal-horario.component.css',
})
export class ModalHorarioComponent {
  @Output() horarioAgregado = new EventEmitter<Horario>();

  horario: Horario = {
    idHorario: 0,
    rango: '',
  };

  horarioService = inject(HorariosService);

  agregarHorario(form: NgForm) {
    const datos = form.value;
    console.log(datos);
    if (form.valid) {
      this.horarioService.postHorario(datos).subscribe((data: any) => {
        console.log(data);
        this.horarioAgregado.emit(data);
        form.resetForm();
      });
    }
  }
}
