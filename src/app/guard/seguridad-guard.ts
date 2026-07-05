import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login-service';

export const seguridadGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const loginService = inject(LoginService);

    if (loginService.verificar()) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};
