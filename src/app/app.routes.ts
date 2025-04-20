import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: [
      {
        path: 'about',
        loadComponent: () => import('@pages/about/about.component').then(c => c.AboutComponent),
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('@auth/feature-login/login-container/login-container.component').then(c => c.LoginContainerComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('@auth/feature-register/register-container/register-container.component').then(c => c.RegisterContainerComponent),
  },
  // появятся еще маршруты которые будут дотупны только зарегестрированным через AuthGuard
];
