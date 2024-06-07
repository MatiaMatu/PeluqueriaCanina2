import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { v4 as uuidv4 } from 'uuid';
import { Appointment } from 'src/app/models/appointment.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { generateAvailableTimes } from 'src/app/utils/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-appointment-component',
  templateUrl: './schedule-appointment-component.page.html',
  styleUrls: ['./schedule-appointment-component.page.scss'],
})
export class ScheduleAppointmentComponentPage implements OnInit {
  form: FormGroup;
  availableTimes: string[] = [];


  constructor(private citaService: CitaService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.form = new FormGroup({
      ownerName: new FormControl('', Validators.required),
      petName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });

    this.form.get('date').valueChanges.subscribe(date => {
      if (date) {
      this.loadAvailableTimes(date);
      }
    });
    }
    isWeekday = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getUTCDay();
      return day !== 0 && day !== 6; // 0 es Domingo, 6 es Sábado
    };

  loadAvailableTimes(date: string) { 
    this.citaService.getAppointmentsByDate(date).pipe(
      map(appointments => appointments.map(app => app.time))
    ).subscribe(bookedTimes => {
      this.availableTimes = generateAvailableTimes(date, bookedTimes);
    });
  }

  formatTime(time: string): string {
    const [hour, minute] = time.split(':');
    let hourNumber = parseInt(hour, 10);
    const period = hourNumber >= 12 ? 'PM' : 'AM';
    if (hourNumber > 12) {
      hourNumber -= 12;
    } else if (hourNumber === 0) {
      hourNumber = 12;
    }
    return `${hourNumber}:${minute} ${period}`;
  }
  

  async scheduleAppointment() {
  if(this.form.valid) {
    const newAppointment: Appointment = {
      ...this.form.value,
      date: `${this.form.value.date}T${this.form.value.time}`,
      id: uuidv4(),
      trackingCode: uuidv4().split('-')[0],
      status: 'Scheduled',
      userId: (await this.afAuth.currentUser).uid
    };
    this.citaService.createAppointment(newAppointment);
    
  
    }
  }

}