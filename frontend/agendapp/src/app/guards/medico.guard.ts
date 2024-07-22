import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const medicoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(AuthService);

  if (userService.getRol() !== 2) {
    router.navigate(['/']);
    console.log('No tienes permisos para acceder a esta página');
    return false;
  } else {
    router.navigate(['/home_medico']);
    router.navigate(['/buscar']);
    router.navigate(['/ficha_paciente/']);
    router.navigate(['/inbox']);
    router.navigate(['/videollamada']);
    return true;
  }
};
