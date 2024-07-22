import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);
    const userService = inject(AuthService);
    
    if (userService.getRol() !== 3) {
      router.navigate(['/']);
      console.log('No tienes permisos para acceder a esta página');
      return false;
    } else {
      router.navigate(['/admin']);
      router.navigate(['/buscar_usuarios']);
      router.navigate(['/editar/']);
      router.navigate(['/inbox_admin']);
      router.navigate(['/configuraciones']);
      return true;
    }
};
