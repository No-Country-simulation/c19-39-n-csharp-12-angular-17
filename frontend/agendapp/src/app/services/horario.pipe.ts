import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horarioFilter',
  standalone: true,
})
export class HorarioPipe implements PipeTransform {
  private HorarioMap: any = {
    1: '08:00-08:30',
    3: '08:00-08:30',
    10: '08:00-08:30',
    11: '09:30-10:00',
    12: '10:00-10:30',
    13: '11:00-11:30',
    14: '12:00-12:30',
    15: '13:00-13:30'
  };

  transform(value: number): string {
    return this.HorarioMap[value] || 'Horario no disponible';
  }
}
