import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiProviderService } from '../services/api-provider.service';

export const pacienteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const userService = inject(AuthService);
  const turnos = inject(ApiProviderService);
  console.log(turnos);

  

  if (userService.getRol() !== 1) {
    router.navigate(['/']);
    console.log('No tienes permisos para acceder a esta página');    
    return false;
  }else{
    router.navigate(['/home_usuario']);
    router.navigate(['/mis_turnos']);
    router.navigate(['/turno']);
    router.navigate(['/turno/', route.params]);
    router.navigate(['/especialidades']);
    router.navigate(['/especialidades/', route.params]);    
    return true;
  }


};
