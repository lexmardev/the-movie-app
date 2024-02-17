import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const MainLayoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const apiKey = localStorage.getItem('apiKey');

  if (apiKey) {
    return true;
  }

  router.navigate(['/api-key']);
  return false;
};

export const APIKeyPageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const apiKey = localStorage.getItem('apiKey');

  if (apiKey) {
    router.navigate(['/api-key']);
    return false;
  }

  return true;
};
