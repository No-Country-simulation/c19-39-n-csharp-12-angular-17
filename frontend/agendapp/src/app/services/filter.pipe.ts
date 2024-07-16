import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((item: any) => {
      const containsName =
        (item.nombre && item.nombre.toLowerCase().includes(args)) ||
        (item.apellido && item.apellido.toLowerCase().includes(args)) ||
        (item.email && item.email.toLowerCase().includes(args)) ||
        (item.telefono && item.telefono.toLowerCase().includes(args)) ||
        (item.motivo && item.motivo.toLowerCase().includes(args)) ||
        (item.fecha && item.fecha.toLowerCase().includes(args)) ||
        (item.hora && item.hora.toLowerCase().includes(args));

      const containsDni = item.dni && item.dni.toString().includes(args);
      const containsId = item.idUsuario && item.idUsuario.toString().includes(args);

      return containsName || containsDni || containsId;
    });

    return null;
  }
}
