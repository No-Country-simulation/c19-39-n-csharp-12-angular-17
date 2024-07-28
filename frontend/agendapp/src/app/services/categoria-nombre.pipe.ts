import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriaNombre',
  standalone: true
})
export class CategoriaNombrePipe implements PipeTransform {

  private categoriaMap: any = {
    1: 'Cardiología',
    2: 'Dermatología',
    3: 'Endocrinología',
    4: 'Obstetricia',
    5: 'Geriatría',
    6: 'Neurologia'  
  }

  transform(value: number): string {
    return this.categoriaMap[value] || 'Categoría desconocida';
  }

}

