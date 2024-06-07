import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);

  const user = localStorage.getItem('user');
  
  if (!user) {
    utilsSvc.routerLink('/auth');
    return false;
  }

  const userData = JSON.parse(user);

  return firebaseSvc.getUserRole(userData.uid).pipe(
    take(1),
    map(role => {
      if (role === 'admin') {
        return true;
      } else {
        utilsSvc.routerLink('/no-access');
        return false;
      }
    })
  );
};
