import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent)
  }
];
