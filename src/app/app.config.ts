import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { paginatorEspanol } from './services/paginator-es';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { errorInterceptor } from './components/errors/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
    if (typeof window === 'undefined') {
        return null;
    }
    const token = window.sessionStorage.getItem('token');
    return token && token.split('.').length === 3 ? token : null;
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideCharts(withDefaultRegisterables()),
        provideHttpClient(
            withFetch(),
            withInterceptors([errorInterceptor]),
            withInterceptorsFromDi()
        ),
        { provide: MatPaginatorIntl, useFactory: paginatorEspanol },
        importProvidersFrom(
            JwtModule.forRoot({
                config: {
                    tokenGetter,
                    allowedDomains: ['localhost:8080'],
                    disallowedRoutes: ['http://localhost:8080/InkaMetrics/tf/login'],
                },
            })
        ),
    ],
};
