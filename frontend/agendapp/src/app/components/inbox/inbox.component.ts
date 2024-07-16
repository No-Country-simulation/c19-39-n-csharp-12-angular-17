import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarusuariologueadoComponent } from '../../shared/navbarusuariologueado/navbarusuariologueado.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [RouterLink, NavbarusuariologueadoComponent, FooterComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent {}
