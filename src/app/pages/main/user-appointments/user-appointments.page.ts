import { Component, OnInit,inject } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Appointment } from 'src/app/models/appointment.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';





@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.page.html',
  styleUrls: ['./user-appointments.page.scss'],

})
export class UserAppointmentsPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  appointments$: Observable<Appointment[]>;

  constructor(private citaService: CitaService, private afAuth: AngularFireAuth) {}
  signOut() {
    this.firebaseSvc.signOut();
   }

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.appointments$ = this.citaService.getAppointmentsByUserId(user.uid);
      }
    });
  }
  copyTrackingCode(trackingCode: string) {
    navigator.clipboard.writeText(trackingCode).then(() => {
      console.log('Código copiado al portapapeles: ' + trackingCode);
      alert('Código copiado ' + trackingCode); // Mostrar mensaje al usuario
    }).catch(err => {
      console.error('Error al copiar el código al portapapeles: ', err);
      alert('Error al copiar el código al portapapeles. Por favor, inténtalo de nuevo.'); // Mostrar mensaje de error al usuario
    });
  }
  formatDateTime(date: string, time: string): string {
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    return `${day}/${month}/${year} a las ${hour}:${minute} Horas`;
  }
  
}
