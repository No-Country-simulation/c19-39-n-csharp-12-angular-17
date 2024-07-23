import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { CommonModule } from '@angular/common';
import { ApiProviderService } from '../../services/api-provider.service';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../services/alerts/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [FooterComponent, NavbarusuariologueadoComponent, CommonModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent implements OnInit {
  section: string = '';
  mensajes: any[] = [];

  route = inject(ActivatedRoute);
  apiServicr = inject(ApiProviderService);
  sweetService = inject(SweetAlertService);

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.obtenerMensajes();
    this.notifyMessages();
  }

  //Obetener mensajes JasonServer
  obtenerMensajes() {
    this.apiServicr.getMensajes().subscribe((data: any) => {
      this.mensajes = data;
      console.log(this.mensajes);
    });
  }

  notifyMessages():void{
    if(this.mensajes.length > 0 ){
      this.sweetService.Toast.fire({
        title:"Tienes nuevos mensajes.",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      })
    }
  }
}
