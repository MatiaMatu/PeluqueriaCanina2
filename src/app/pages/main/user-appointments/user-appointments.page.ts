import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Appointment } from 'src/app/models/appointment.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { map } from 'rxjs/operators'; 
@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.page.html',
  styleUrls: ['./user-appointments.page.scss'],
})
export class UserAppointmentsPage implements OnInit {
  appointments$: Observable<Appointment[]>;

  constructor(
    private citaService: CitaService,
    private afAuth: AngularFireAuth,
    private firebaseSvc: FirebaseService
  ) {}

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.appointments$ = this.citaService.getAppointmentsByUserId(user.uid).pipe(
          // Calculando el totalCost para cada cita
          map(appointments => appointments.map(appointment => ({
            ...appointment,
            totalCost: appointment.selectedProducts.reduce((total, product) => total + product.price, 0)
          })))
        );
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

  signOut() {
    this.firebaseSvc.signOut();
  }
}
