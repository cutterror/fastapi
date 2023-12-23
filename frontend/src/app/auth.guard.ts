import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private dialogs: TuiDialogService,
        private readonly injector: Injector,
        private router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (window.localStorage.getItem('id'))
            return true;

        this.router.navigate(['/auth']);

        return false;
    }
}
