import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);
  const router = inject(Router);

  return new Promise(resolve => {
    firebaseSvc.getAuth().onAuthStateChanged(async (auth) => {
      if (auth) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          // Fetch user data if not in local storage
          const userDoc = await firebaseSvc.getDocument(`users/${auth.uid}`);
          localStorage.setItem('user', JSON.stringify(userDoc));
        }

        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData) {
          if (route.url[0].path.startsWith('employee')) {
            if (userData.role === 'employee') {
              resolve(true);
            } else {
              utilsSvc.routerLink('/main/home');
              resolve(false);
            }
          } else {
            if (userData.role === 'client') {
              resolve(true);
            } else {
              utilsSvc.routerLink('/main/employee');
              resolve(false);
            }
          }
        } else {
          utilsSvc.routerLink('/auth');
          resolve(false);
        }
      } else {
        utilsSvc.routerLink('/auth');
        resolve(false);
      }
    });
  });
};
