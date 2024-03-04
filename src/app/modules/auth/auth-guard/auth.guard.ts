import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isStudentLoggedIn$.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdminLoggedIn$.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/admin']);
        return false;
      }
    })
  );
};
