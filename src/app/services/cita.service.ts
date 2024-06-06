import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  auth = inject(AngularFireAuth);


  constructor(private db: AngularFireDatabase) {}

 async createAppointment(appointment: Appointment): Promise<void> {
  const user = await this.auth.currentUser;
  if (user) {
    appointment.userId = user.uid;
    return this.db.object(`/appointments/${appointment.id}`).set(appointment);
  }
 }
 getAppointmentsByUserId(userId: string): Observable<Appointment[]> {
  return this.db.list<Appointment>('/appointments', ref =>
    ref.orderByChild('userId').equalTo(userId)).valueChanges();
}


  getAppointmentByTrackingCode(trackingCode: string): Observable<Appointment> {
    return this.db.list<Appointment>('/appointments', ref =>
      ref.orderByChild('trackingCode').equalTo(trackingCode)).valueChanges().pipe(map(apps => apps[0]));
  }
  getAllAppointments(): Observable<Appointment[]> {
    return this.db.list<Appointment>('/appointments').valueChanges();
  }


  updateStatus(id: string, status: string): Promise<void> {
    return this.db.object(`/appointments/${id}`).update({ status });
  }
}

