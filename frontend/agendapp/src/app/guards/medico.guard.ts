import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const medicoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(AuthService);

  const isMedico = userService.getRol() === 2;

  if (!isMedico) {
    router.navigate(['/error']);
    console.log('No tienes permisos para acceder a esta página');
    return false;
  }
  return true;
};
