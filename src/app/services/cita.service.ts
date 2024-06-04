import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model';


@Injectable({
  providedIn: 'root'
})
export class CitaService {
  constructor(private db: AngularFireDatabase) {}

  createAppointment(appointment: Appointment): Promise<void> {
    return this.db.object(`/appointments/${appointment.id}`).set(appointment);
  }

  getAppointmentByTrackingCode(trackingCode: string): Observable<Appointment> {
    return this.db.list<Appointment>('/appointments', ref =>
      ref.orderByChild('trackingCode').equalTo(trackingCode)).valueChanges().pipe(map(apps => apps[0]));
  }

  getStatus(id: string): Observable<any> {
    return this.db.object(`/petStatus/${id}`).valueChanges();
  }

  updateStatus(id: string, status: string): Promise<void> {
    return this.db.object(`/petStatus/${id}`).update({ status });
  }
}