import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { ApiService } from '../../services/api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-editarusuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-editarusuario.component.html',
  styleUrl: './modal-editarusuario.component.css',
})
export class ModalEditarusuarioComponent implements OnChanges {
  @Output() usuarioEditado = new EventEmitter<Usuario>();
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

  editarUsuario(form: NgForm) {
    if (form.valid) {
      this.apiService
        .putUsuario(this.user)
        .subscribe((data: Usuario) => {
          this.usuarioEditado.emit(data);          
          form.resetForm();          
        });
    }
  }
}
