import { Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModuloUsuarioComponent } from './components/modulo-usuario/modulo-usuario.component';

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
  //Home Usuario
  {
    path: 'home_usuario',
    title: 'Home Usuario',
    component: ModuloUsuarioComponent,
  },
  //Home Medico
  // {},
  //Home Admin
  // {},
  //   {
  //     path: '**',
  //     // redirectTo: 'auth/login',  /*Cuando esté el login, interceptors, guards*/
  //     redirectTo: '',
  //     pathMatch: 'full',
  //   },
];