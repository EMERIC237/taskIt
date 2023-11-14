import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
class PermissionsService {

  constructor(private authService: AuthService){}
  canActivate( ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      return false;
    }

    return true;
  }
  canMatch(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      return false;
    }
    return true;
  }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate()
};
