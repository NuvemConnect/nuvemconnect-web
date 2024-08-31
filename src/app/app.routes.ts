import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
    title: 'Página Inicial'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
    title: 'NuvemConnect | Entrar'
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then((m) => m.RegisterComponent),
    title: 'NuvemConnect | Cadastrar'
  },
  {
    path: 'recovery',
    loadComponent: () =>
      import('./components/recovery/recovery.component').then((m) => m.RecoveryComponent),
    title: 'NuvemConnect | Recuperar Senha'
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./components/verify/verify.component').then((m) => m.VerifyComponent),
    title: 'NuvemConnect | Código de Verificação'
  },
  {
    path: 'new-password',
    loadComponent: () =>
      import('./components/new-password/new-password.component').then(
        (m) => m.NewPasswordComponent
      ),
    title: 'NuvemConnect | Nova Senha'
  },
  {
    path: 'confirm-email',
    loadComponent: () =>
      import('./components/confirm-email/confirm-email.component').then(
        (m) => m.ConfirmEmailComponent
      ),
    title: 'NuvemConnect | Email Confirmado'
  },
  { path: '**', redirectTo: '/login' }
];
