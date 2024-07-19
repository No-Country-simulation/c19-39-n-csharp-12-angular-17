import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { CommonModule } from '@angular/common';
import { ApiProviderService } from '../../services/api-provider.service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [FooterComponent, NavbarusuariologueadoComponent, CommonModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent implements OnInit {
  section: string = '';
  mensajes: any[] = [];

  route = inject(ActivatedRoute);
  apiServicr = inject(ApiProviderService);

  ngOnInit(): void {
    this.section = this.route.snapshot.routeConfig?.path || '';
    this.obtenerMensajes();
  }

  //Obetener mensajes JasonServer
  obtenerMensajes() {
    this.apiServicr.getMensajes().subscribe((data: any) => {
      this.mensajes = data;
      console.log(this.mensajes);
    });
  }  
}
