import { Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModuloUsuarioComponent } from './components/modulo-usuario/modulo-usuario.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { TurnoComponent } from './components/turno/turno.component';
import { TurnodetalleComponent } from './components/turnodetalle/turnodetalle.component';
import { EspecialidadDetalleComponent } from './components/especialidad.detalle/especialidad.detalle.component';
import { ListaturnosComponent } from './components/listaturnos/listaturnos.component';

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
  {
    path: 'mis_turnos',
    title: 'Usuario | Mis Turnos',
    component: ListaturnosComponent,
  },
  {
    path: 'turno',
    title: 'Crear Turno',
    component: TurnoComponent,
  },
  {
    path: 'turno/:id',
    title: 'Detalle de Turno',
    component: TurnodetalleComponent,
  },
  {
    path: 'especialidades',
    title: 'Especialidades',
    component: EspecialidadesComponent,
  },
  {
    path: 'especialidad/:id',
    title: 'Especialidad Detalle',
    component: EspecialidadDetalleComponent,
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
