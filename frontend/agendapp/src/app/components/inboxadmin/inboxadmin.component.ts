import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SweetAlertService } from '../../services/alerts/sweet-alert.service';

import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';

import { Mensaje } from '../../interfaces/mensaje';
import { parseISO, format } from 'date-fns';

@Component({
  selector: 'app-inboxadmin',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarusuariologueadoComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './inboxadmin.component.html',
  styleUrl: './inboxadmin.component.css',
})
export class InboxadminComponent implements OnInit {
  mensajes: Mensaje[] = [
    {
      idMensaje: 1,
      idEmisor: 23654,
      idReceptor: 77789,
      contenido:
        'Hola, ¿cómo estás?, fijate si ya podés ingresar al turno detalle',
      datetime: '2024-07-13T12:00:00Z',
      estado: 'Enviado',
    },
    {
      idMensaje: 2,
      idEmisor: 77789,
      idReceptor: 23654,
      contenido: 'Ya realicé los cambios del usuario que me habias comentado',
      datetime: '2024-07-13T12:01:00Z',
      estado: 'Recibido',
    },
  ];

  sweetService = inject(SweetAlertService);

  ngOnInit(): void {
    this.notifyExistingMessages();
  }


  extraerHora(datetime: string): string {
    const date = parseISO(datetime);
    // console.log(date);
    return format(date, 'HH:mm:ss');
  }

  notifyExistingMessages() {
    if (this.mensajes.length > 0) {
      this.sweetService.Toast.fire({
        title: 'Existen mensajes nuevos.',
      });
    }
  }
}
