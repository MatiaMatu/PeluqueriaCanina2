import { Component,inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
declare var $: any; // Declarar la variable $ para usar jQuery

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {
  firebaseSvc = inject(FirebaseService);
  constructor(private router: Router) {}

  signOut() {
    this.firebaseSvc.signOut();
   }
  
   isNavbarVisible(): boolean {
    // Obtener la URL actual
    const currentUrl = this.router.url;
    // Mostrar el navbar en estas páginas
    if (
      currentUrl.includes('/main/home') ||
      currentUrl.includes('/main/schedule-appointment-component') ||
      currentUrl.includes('/main/user-appointments') ||
      currentUrl.includes('/main/track-pet') // Aquí puedes agregar más páginas
    ) {
      return true;
    } else {
      return false;
    }
  }




  

}
