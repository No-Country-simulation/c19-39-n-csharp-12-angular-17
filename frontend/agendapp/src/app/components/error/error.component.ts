import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  usuario = {} as any;
  private location = inject(Location);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  Volver(): void {
    this.location.back();
  }

}
