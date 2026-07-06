import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login-service';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const loginService = inject(LoginService);

    if (!loginService.verificar()) {
        router.navigate(['/login']);
        return false;
    }

    const rol = loginService.showRole();
    if (rol && JSON.stringify(rol).includes('ADMINISTRADOR')) {
        return true;
    }

    router.navigate(['/homes']);
    return false;
};
