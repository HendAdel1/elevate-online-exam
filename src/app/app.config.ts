import { AuthHttpApi } from './../../projects/auth/src/lib/api/auth-http.api';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LucideAngularModule } from 'lucide-angular';
import { LucideIcons } from './icons/icons';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthApi } from '../../projects/auth/src/lib/api/auth.api';
import { AuthService } from '../../projects/auth/src/lib/services/auth.service';
import { DefaultAuthService } from '../../projects/auth/src/lib/services/auth-default.service';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, httpErrorInterceptor])),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick(LucideIcons)),
    {
    provide: AuthApi,
    useClass: AuthHttpApi,
  },
  {
    provide: AuthService,
    useClass: DefaultAuthService,
  },
  ]
};
