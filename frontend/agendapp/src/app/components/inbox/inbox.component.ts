import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SweetAlertService } from '../../services/alerts/sweet-alert.service';

import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarusuariologueadoComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent implements OnInit {
  mensajes: any[] = [
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
    this.notifyMessages();
      }


  notifyMessages(): void {
    if (this.mensajes.length > 0) {
      this.sweetService.Toast.fire({
        title: 'Tienes nuevos mensajes.',
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    }
  }
}
