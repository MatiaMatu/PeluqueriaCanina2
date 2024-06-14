import { Component,inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
declare var $: any; // Declarar la variable $ para usar jQuery

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {
  firebaseSvc = inject(FirebaseService);
  constructor() {}

  signOut() {
    this.firebaseSvc.signOut();
   }
  

  

}
