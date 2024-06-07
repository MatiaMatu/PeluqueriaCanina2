import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const nonAdminGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);

  return new Promise(resolve => {
    firebaseSvc.getAuth().onAuthStateChanged((auth) => {
      if (auth) {
        firebaseSvc.getUserRole(auth.uid).subscribe(role => {
          if (role !== 'admin') {
            resolve(true);
          } else {
            utilsSvc.routerLink('/admin/dashboard');
            resolve(false);
          }
        });
      } else {
        utilsSvc.routerLink('/auth');
        resolve(false);
      }
    });
  });
};