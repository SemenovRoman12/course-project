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
import {authFeature} from '@auth/data-access/+state/auth.reducer';
import * as authEffects from "@auth/data-access/+state/auth.effects";
import {tokenInterceptor} from '@auth/services/token.interceptor';
import * as reviewEffects from '@features/reviews/+state/reviews.effects';
import {reviewsFeature} from '@features/reviews/+state/reviews.reducer';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {profileFeature} from '@features/profile/data-access/+state/profile.reducer';
import * as profileEffects from '@features/profile/data-access/+state/profile.effects';
import {GEMINI_API_URL} from '@features/recommendations/services/gemini-api-url.token';
import * as recommendationEffects from '@features/recommendations/data-access/+state/recommendation.effects';
import {recommendationFeature} from '@features/recommendations/data-access/+state/recommendation.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [reviewsFeature.name]: reviewsFeature.reducer,
      [profileFeature.name]: profileFeature.reducer,
      [recommendationFeature.name]: recommendationFeature.reducer,
    }),
    provideEffects(
      authEffects,
      reviewEffects,
      profileEffects,
      recommendationEffects,
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    {
      provide: GEMINI_API_URL,
      useValue: environment.gemini_api_url
    },
    importProvidersFrom(NgxChartsModule),
  ]
};
