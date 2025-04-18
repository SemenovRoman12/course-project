import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('@auth/feature-login/login-container/login-container.component').then(c => c.LoginContainerComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('@auth/feature-register/register-container/register-container.component').then(c => c.RegisterContainerComponent),
  }
];
