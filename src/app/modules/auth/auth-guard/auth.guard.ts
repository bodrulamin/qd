import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {MessageService} from "primeng/api";

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const router = inject(Router);
  if (authService.adminAuthenticated()) {
    return true;
  }
  messageService.add({summary: 'Please Login!', detail: 'You are not logged in.', severity: 'error'})
  return router.navigate(['admin']);
};

export const studentAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.studentAutheticated()) {
    return true;
  }
  messageService.add({summary: 'Please Login!', detail: 'You are not logged in.', severity: 'error'})

  return router.navigate(['/']);
};
