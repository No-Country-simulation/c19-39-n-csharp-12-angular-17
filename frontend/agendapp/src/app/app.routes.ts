import { Routes } from '@angular/router';

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
    path: 'login_usuarios',
    title: 'Login Usuarios',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  //Login de medicos
  {
    path: 'login_medicos',
    title: 'Login Médico',
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
  },
  {
    path: 'mis_turnos',
    title: 'Mis Turnos',
    loadComponent: () =>
      import('./components/listaturnos/listaturnos.component').then(
        (m) => m.ListaturnosComponent
      ),
  },
  {
    path: 'turno',
    title: 'Crear Turno',
    loadComponent: () =>
      import('./components/turno/turno.component').then(
        (m) => m.TurnoComponent
      ),
  },
  {
    path: 'turno/:id',
    title: 'Detalle del Turno',
    loadComponent: () =>
      import('./components/turnodetalle/turnodetalle.component').then(
        (m) => m.TurnodetalleComponent
      ),
  },
  {
    path: 'especialidades',
    title: 'Especialidades',
    loadComponent: () =>
      import('./components/especialidades/especialidades.component').then(
        (m) => m.EspecialidadesComponent
      ),
  },
  {
    path: 'especialidad/:id',
    title: 'Especialistas',
    loadComponent: () =>
      import(
        './components/especialidad.detalle/especialidad.detalle.component'
      ).then((m) => m.EspecialidadDetalleComponent),
  },
  //Home Medico
  {
    path: 'home_medico',
    title: 'Home Médico',
    loadComponent: () =>
      import('./components/modulo-medico/modulo-medico.component').then(
        (m) => m.ModuloMedicoComponent
      ),
  },
  {
    path: 'buscar',
    title: 'Buscar Paciente',
    loadComponent: () =>
      import('./components/buscar/buscar.component').then(
        (m) => m.BuscarComponent
      ),
  },
  {
    path: 'ficha_paciente/:id',
    title: 'Ficha del Paciente',
    loadComponent: () =>
      import('./components/ficha-paciente/ficha-paciente.component').then(
        (m) => m.FichaPacienteComponent
      ),
  },
  {
    path: 'inbox',
    title: 'Mensajes',
    loadComponent: () =>
      import('./components/inbox/inbox.component').then(
        (m) => m.InboxComponent
      ),
  },
  // Home Admin
  {
    path: 'admin',
    title: 'Admin',
    loadComponent: () =>
      import('./components/admin/admin.component').then(
        (m) => m.AdminComponent
      ),
  },
  {
    path: 'buscar',
    title: 'Buscar Usuarios',
    loadComponent: () =>
      import('./components/buscar-usuarios/buscar-usuarios.component').then(
        (m) => m.BuscarUsuariosComponent
      ),
  },
  {
    path: 'editar/:id',
    title: 'Editar Usuario',
    loadComponent: () =>
      import('./components/editar/editar.component').then(
        (m) => m.EditarComponent
      ),
  },
  {
    path: 'videollamada',
    title: 'Atención Virtual',
    loadComponent: () =>
      import('./components/videollamada/videollamada.component').then(
        (m) => m.VideollamadaComponent
      ),
  },
  //   {
  //     path: '**',
  //     // redirectTo: 'auth/login',  /*Cuando esté el login, interceptors, guards*/
  //     redirectTo: '',
  //     pathMatch: 'full',
  //   },
];
