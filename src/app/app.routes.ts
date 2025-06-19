import { Routes } from '@angular/router';
import {authGuard} from '@auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('@pages/about/about.component').then(c => c.AboutComponent),
      },
      {
        path: 'reviews',
        loadComponent: () => import('@features/reviews/reviews-list-container/reviews-list-container.component').then(c => c.ReviewsListContainerComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('@features/profile/profile-container/profile-container.component').then(c => c.ProfileContainerComponent),
        canActivate: [authGuard]
      },
      {
        path: 'recommendations',
        loadComponent: () => import('@features/recommendations/recommendations-list-container/recommendations-list-container.component').then(c => c.RecommendationsListContainerComponent),
        canActivate: [authGuard]
      }
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
];
