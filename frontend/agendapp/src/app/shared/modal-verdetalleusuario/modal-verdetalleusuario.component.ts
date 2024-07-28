import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-modal-verdetalleusuario',
  standalone: true,
  imports: [],
  templateUrl: './modal-verdetalleusuario.component.html',
  styleUrl: './modal-verdetalleusuario.component.css',
})
export class ModalVerdetalleusuarioComponent {
  @Input() datoEntrada: any;

  user: Usuario = {
    idUsuario: 0,
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasenia: '',
    idRol: 0,
  };

  apiService = inject(ApiService);

  constructor() {
    if (this.datoEntrada) {
      this.user = { ...this.datoEntrada };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datoEntrada'] && this.datoEntrada) {
      this.user = { ...this.datoEntrada };
      console.log(this.user);
    }
  }
}
