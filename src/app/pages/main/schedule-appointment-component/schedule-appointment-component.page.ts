import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { v4 as uuidv4 } from 'uuid';
import { Appointment } from 'src/app/models/appointment.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-schedule-appointment-component',
  templateUrl: './schedule-appointment-component.page.html',
  styleUrls: ['./schedule-appointment-component.page.scss'],
})
export class ScheduleAppointmentComponentPage implements OnInit {
  ownerName: string;
  petName: string;
  date: string;
  trackingCode: string;


  constructor(private citaService: CitaService, private afAuth: AngularFireAuth) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  async scheduleAppointment() {
    const id = uuidv4();
    this.trackingCode = uuidv4().split('-')[0];
    const user = await this.afAuth.currentUser;

    if (user) {
      const newAppointment: Appointment = {
        id,
        petName: this.petName,
        ownerName: this.ownerName,
        date: this.date,
        trackingCode: this.trackingCode,
        status: 'Scheduled',
        userId: user.uid
      };
      this.citaService.createAppointment(newAppointment);
    }
  }
}
