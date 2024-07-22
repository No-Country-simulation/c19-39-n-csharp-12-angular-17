import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Medico } from '../interfaces/medico';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private apiUrl = 'https://www.agendapp.somee.com/api/';

  private medicosPorCategoria: { [key: number]: Medico[] } = {};
  private medicosPorHorario: { [key: number]: Medico[] } = {};

  medicosFiltradosPorCategoria: {
    [x: string]: any;
    [key: number]: Medico[];
  } = {};
  medicosFiltradosPorHorario: { [key: number]: Medico[] } = {};

  constructor(private http: HttpClient, private apiservice: ApiService) {}

  //Obtener todos los medicos segun horario y categoria
  getMedicos(): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}Med/medicos`).pipe(
      map((response: any) => {
        const medicos = response.data;
        this.clasificarMedicosPorCategoria(medicos);
        this.clasificarMedicosPorHorario(medicos);
        return medicos;
      })
    );
  }

  getMedicosDataUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Med/medicos`).pipe(
      map((response) => {
        const medicos = response.data;
        this.clasificarMedicosPorCategoria(medicos);
        this.clasificarMedicosPorHorario(medicos);
        return medicos.map((medico: any) => this.desestructurarMedico(medico));
      })
    );
  }

  private desestructurarMedico(medico: Medico): any {
    const { idUsuarioNavigation, ...restoMedico } = medico;
    return {
      ...idUsuarioNavigation,
      idMedico: medico.idMedico,
      idCategoria: medico.idCategoria,
      idHorario: medico.idHorario,
    };
  }

  private clasificarMedicosPorCategoria(medicos: Medico[]) {
    this.medicosPorCategoria = {};
    this.medicosFiltradosPorCategoria = {};

    medicos.forEach((medico: Medico) => {
      const categoriaId = medico.idCategoria;
      if (!this.medicosPorCategoria[categoriaId]) {
        this.medicosPorCategoria[categoriaId] = [];
      }
      if (!this.medicosFiltradosPorCategoria[categoriaId]) {
        this.medicosFiltradosPorCategoria[categoriaId] = [];
      }
      this.medicosPorCategoria[categoriaId].push(medico);
      this.medicosFiltradosPorCategoria[categoriaId].push(medico);
    });
  }

  //Obtener medicos por categoria
  getMedicosByCategoria(categoriaId: number): Medico[] {
    return this.medicosFiltradosPorCategoria[categoriaId] || [];
  }

  private clasificarMedicosPorHorario(medicos: Medico[]) {
    this.medicosPorHorario = {};
    this.medicosFiltradosPorHorario = {};

    medicos.forEach((medico: Medico) => {
      const horarioId = medico.idHorario;
      if (!this.medicosPorHorario[horarioId]) {
        this.medicosPorHorario[horarioId] = [];
      }
      if (!this.medicosFiltradosPorHorario[horarioId]) {
        this.medicosFiltradosPorHorario[horarioId] = [];
      }
      this.medicosPorHorario[horarioId].push(medico);
      this.medicosFiltradosPorHorario[horarioId].push(medico);
    });
  }

  //Obtener medicos por horario
  getMedicosByHorario(horarioId: number): Medico[] {
    return this.medicosFiltradosPorHorario[horarioId] || [];
  }
}
