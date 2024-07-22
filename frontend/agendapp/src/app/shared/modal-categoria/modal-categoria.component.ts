import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Categoria } from '../../interfaces/api';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-modal-categoria',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css',
})
export class ModalCategoriaComponent {
  @Output() categoriaAgregada = new EventEmitter<Categoria>();

  categoria: Categoria = {
    idCategoria: 0,
    nombre: '',
    imgSrc: '',
  };

  categoriaService = inject(CategoriasService);

  //!!Agrega una categoria a la base de datos
  agregarCategoria(form: NgForm) {
    const datos = form.value;
    console.log(datos);
    if (form.valid) {
      this.categoriaService.postCategoria(datos).subscribe((data: any) => {
        console.log(data);
        this.categoriaAgregada.emit(data);
        form.resetForm();
      });
    }
  }
}
