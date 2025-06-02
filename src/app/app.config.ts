import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {API_URL} from '@core/http/api-url.token';
import {environment} from '../environments/environment.development';
import {authFeature} from '@auth/+state/auth.reducer';
import * as authEffects from "@auth/+state/auth.effects";
import {tokenInterceptor} from '@auth/services/token.interceptor';
import * as reviewEffects from '@features/reviews/+state/reviews.effects';
import {reviewsFeature} from '@features/reviews/+state/reviews.reducer';
import {NgxChartsModule} from '@swimlane/ngx-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [reviewsFeature.name]: reviewsFeature.reducer
    }),
    provideEffects(
      authEffects,
      reviewEffects,
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    importProvidersFrom(NgxChartsModule),
  ]
};
