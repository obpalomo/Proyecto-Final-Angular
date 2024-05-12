import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated() && userService.getRole() === "admin") {
    return true;
  } else {
    return router.parseUrl('/films');
  }
};
