import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);
  const role = cookies.get('role')
  const router = inject(Router)
  if(role === "admin"){
    return true
  } else {
    return false
  }
};
