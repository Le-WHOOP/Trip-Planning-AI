import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

export const travelDataGuard: CanActivateFn = () => {
  const service = inject(ApiService);
  const router = inject(Router);

  if (!service.hasTravelPlan()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
