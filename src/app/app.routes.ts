import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'recovery',
    loadComponent: () =>
      import('./components/recovery/recovery.component').then((m) => m.RecoveryComponent)
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./components/verify/verify.component').then((m) => m.VerifyComponent)
  },
  {
    path: 'new-password',
    loadComponent: () =>
      import('./components/new-password/new-password.component').then((m) => m.NewPasswordComponent)
  },
  { path: '**', redirectTo: '/login' }
];
