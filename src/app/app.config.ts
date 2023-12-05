import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { metaReducers, reducers } from './core/store/app.state';
import { ResourcesEffects } from './core/store/resources/resources.effects';
import { AuthEffects } from './core/store/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    provideEffects([ResourcesEffects, AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: environment.appName,
    }),
  ],
};
