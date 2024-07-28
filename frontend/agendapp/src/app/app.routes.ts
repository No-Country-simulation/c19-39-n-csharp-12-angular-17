import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { medicoGuard } from './guards/medico.guard';
import { pacienteGuard } from './guards/paciente.guard';

export const routes: Routes = [
  //Bienvenida
  {
    path: '',
    title: 'AgendaApp',
    loadComponent: () =>
      import('./components/bienvenida/bienvenida.component').then(
        (m) => m.BienvenidaComponent
      ),
  },
  //Login de usuarios
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  //Registro para medicos
  {
    path: 'registro_medicos',
    title: 'Registro Médico',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  //Registro para pacientes
  {
    path: 'registro_usuarios',
    title: 'Registro Usuarios',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  //Home Usuario
  {
    path: 'home_usuario',
    title: 'Home Usuario',
    loadComponent: () =>
      import('./components/modulo-usuario/modulo-usuario.component').then(
        (m) => m.ModuloUsuarioComponent
      ),
    canActivate: [pacienteGuard],
  },
  {
    path: 'mis_turnos',
    title: 'Mis Turnos',
    loadComponent: () =>
      import('./components/listaturnos/listaturnos.component').then(
        (m) => m.ListaturnosComponent
      ),
    canActivate: [pacienteGuard],
  },
  {
    path: 'turno',
    title: 'Crear Turno',
    loadComponent: () =>
      import('./components/turno/turno.component').then(
        (m) => m.TurnoComponent
      ),
    canActivate: [pacienteGuard],
  },
  {
    path: 'turno/:id',
    title: 'Detalle del Turno',
    loadComponent: () =>
      import('./components/turnodetalle/turnodetalle.component').then(
        (m) => m.TurnodetalleComponent
      ),
    canActivate: [pacienteGuard],
  },
  {
    path: 'especialidades',
    title: 'Especialidades',
    loadComponent: () =>
      import('./components/especialidades/especialidades.component').then(
        (m) => m.EspecialidadesComponent
      ),
    canActivate: [pacienteGuard],
  },
  {
    path: 'especialidad/:id',
    title: 'Especialistas',
    loadComponent: () =>
      import(
        './components/especialidad.detalle/especialidad.detalle.component'
      ).then((m) => m.EspecialidadDetalleComponent),
    canActivate: [pacienteGuard],
  },
  //Home Medico
  {
    path: 'home_medico',
    title: 'Home Médico',
    loadComponent: () =>
      import('./components/modulo-medico/modulo-medico.component').then(
        (m) => m.ModuloMedicoComponent
      ),
    canActivate: [medicoGuard],
  },
  {
    path: 'buscar',
    title: 'Buscar Paciente',
    loadComponent: () =>
      import('./components/buscar/buscar.component').then(
        (m) => m.BuscarComponent
      ),
    canActivate: [medicoGuard],
  },
  {
    path: 'inbox',
    title: 'Mensajes | Medico',
    loadComponent: () =>
      import('./components/inbox/inbox.component').then(
        (m) => m.InboxComponent
      ),
    canActivate: [medicoGuard],
  },
  {
    path: 'videollamada',
    title: 'Atención Virtual',
    loadComponent: () =>
      import('./components/videollamada/videollamada.component').then(
        (m) => m.VideollamadaComponent
      ),
    canActivate: [medicoGuard],
  },
  // Home Admin
  {
    path: 'admin',
    title: 'Admin',
    loadComponent: () =>
      import('./components/modulo-admin/admin.component').then(
        (m) => m.AdminComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'buscar_usuarios',
    title: 'Buscar Usuarios',
    loadComponent: () =>
      import('./components/buscar-usuarios/buscar-usuarios.component').then(
        (m) => m.BuscarUsuariosComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'inbox_admin',
    title: 'Mensajes | Admin',
    loadComponent: () =>
      import('./components/inboxadmin/inboxadmin.component').then(
        (m) => m.InboxadminComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'configuraciones',
    title: 'Configurar Servicios',
    loadComponent: () =>
      import('./components/configuraciones/settings.component').then(
        (m) => m.SettingsComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'ficha_paciente/:id',
    title: 'Ficha del Paciente',
    loadComponent: () =>
      import('./components/ficha-paciente/ficha-paciente.component').then(
        (m) => m.FichaPacienteComponent
      ),
    canActivate: [adminGuard],    
  },
  {
    path: 'error',
    title: 'Error 404',
    loadComponent: () =>
      import('./components/error/error.component').then(
        (m) => m.ErrorComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full',
  },
];
