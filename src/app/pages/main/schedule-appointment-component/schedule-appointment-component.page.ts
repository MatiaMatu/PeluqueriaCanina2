import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { v4 as uuidv4 } from 'uuid';
import { Appointment } from 'src/app/models/appointment.model';

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


  constructor(private petService: CitaService) {}

  ngOnInit() {
  }

  scheduleAppointment() {
    const id = uuidv4();
    this.trackingCode = uuidv4().split('-')[0];
    const newAppointment: Appointment = {
      id,
      petName: this.petName,
      ownerName: this.ownerName,
      date: this.date,
      trackingCode: this.trackingCode,
      status: 'Programada'
    };
    this.petService.createAppointment(newAppointment);
  }
}
