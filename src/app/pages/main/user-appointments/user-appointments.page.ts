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
}
