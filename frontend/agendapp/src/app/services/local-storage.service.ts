import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private key = 'ListaTurnos';

  constructor() {
    this.inicializarListaTurnos();
  }

  private inicializarListaTurnos() {
    const listaTurnos = localStorage.getItem(this.key);
    if (!listaTurnos) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }

  obtenerListaTurnos() {
    const listaTurnos = localStorage.getItem(this.key);
    return listaTurnos ? JSON.parse(listaTurnos) : [];
  }

  guardarListaTurnos(turnos: any[]) {
    localStorage.setItem(this.key, JSON.stringify(turnos));
  }

  guardarTurno(turno: any) {
    const listaTurnos = this.obtenerListaTurnos();
    listaTurnos.push(turno);
    this.guardarListaTurnos(listaTurnos);
    localStorage.setItem('turnoCreado', JSON.stringify(turno));
  }


}


