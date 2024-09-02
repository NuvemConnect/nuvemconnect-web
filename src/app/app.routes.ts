import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/list/list.component').then((m) => m.ListComponent),
        title: 'NuvemConnect | Listar'
      }
    ],
    canActivate: [authGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then((m) => m.LoginComponent),
        title: 'NuvemConnect | Entrar'
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then((m) => m.RegisterComponent),
        title: 'NuvemConnect | Registrar'
      },
      {
        path: 'recovery',
        loadComponent: () =>
          import('./components/recovery/recovery.component').then((m) => m.RecoveryComponent),
        title: 'NuvemConnect | Recuperar'
      },
      {
        path: 'verify',
        loadComponent: () =>
          import('./components/verify/verify.component').then((m) => m.VerifyComponent),
        title: 'NuvemConnect | Verificar'
      },
      {
        path: 'new-password',
        loadComponent: () =>
          import('./components/new-password/new-password.component').then(
            (m) => m.NewPasswordComponent
          ),
        title: 'NuvemConnect | Nova senha'
      },
      {
        path: 'confirm-email',
        loadComponent: () =>
          import('./components/confirm-email/confirm-email.component').then(
            (m) => m.ConfirmEmailComponent
          ),
        title: 'NuvemConnect | Confirmar'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
