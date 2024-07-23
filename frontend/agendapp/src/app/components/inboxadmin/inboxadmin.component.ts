import { Component, inject, OnInit } from '@angular/core';
import { parseISO, format } from 'date-fns';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiProviderService } from '../../services/api-provider.service';
import { Mensaje } from '../../interfaces/mensaje';
import { SweetAlertService } from '../../services/alerts/sweet-alert.service';

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
  section: string = '';
  mensajes: Mensaje[] = [];

  route = inject(ActivatedRoute);
  apiServicr = inject(ApiProviderService);
  sweetService = inject(SweetAlertService);

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.obtenerMensajes();
    this.notifyExistingMessages();
  }

  //Obetener mensajes JasonServer
  obtenerMensajes() {
    this.apiServicr.getMensajes().subscribe((data: any) => {
      this.mensajes = data;
      this.mensajes.forEach((mensaje: any) => {
        mensaje.hora = this.extraerHora(mensaje.datetime);
      });
      console.log(this.mensajes);
    });
  }

  extraerHora(datetime: string): string {
    const date = parseISO(datetime);
    console.log(date);
    return format(date, 'HH:mm:ss');
  }

  notifyExistingMessages(){
    if(this.mensajes.length > 0 ){
      this.sweetService.Toast.fire({
        title: "Existen mensajes nuevos."
      })
    }
  }
}
