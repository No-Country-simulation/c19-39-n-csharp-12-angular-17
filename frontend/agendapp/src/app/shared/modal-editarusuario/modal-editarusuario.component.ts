import { Component, EventEmitter, inject, Output } from '@angular/core';
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
export class ModalEditarusuarioComponent {
  @Output() usuarioEditado = new EventEmitter<Usuario>();

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

  //!!Edita un usuario en la base de datos
  editarUsuario(form: NgForm) {
    const datos = form.value;
    console.log(datos);
    if (form.valid) {
      this.apiService.putUsuario(datos).subscribe((data: any) => {
        console.log(data);
        this.usuarioEditado.emit(data);
        form.resetForm();
      });
    }
  }
}
