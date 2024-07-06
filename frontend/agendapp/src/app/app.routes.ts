import { Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
  //Bienvenida
  {
    path: '',
    title: 'AgendaApp',
    component: BienvenidaComponent,
  },
  //Login de usuarios
  {
    path: 'login_usuarios',
    title: 'Login Usuarios',
    component: LoginComponent,
  },
  //Login de medicos
  {
    path: 'login_medicos',
    title: 'Login Médico',
    component: LoginComponent,
  },
  //Registro para medicos
  {
    path: 'registro_medicos',
    title: 'Registro Médico',
    component: RegistroComponent,
  },
  //Registro para pacientes
  {
    path: 'registro_usuarios',
    title: 'Registro Usuarios',
    component: RegistroComponent,
  },
  //Home Pacientes
//   {
//     path: '**',
//     // redirectTo: 'auth/login',  /*Cuando esté el login, interceptors, guards*/
//     redirectTo: '',
//     pathMatch: 'full',
//   },
];
