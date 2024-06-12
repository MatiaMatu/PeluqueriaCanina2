import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  auth = inject(AngularFireAuth);


  constructor(private db: AngularFireDatabase) {}

  getAppointmentsByDate(date: string): Observable<Appointment[]> {
    return this.db.list<Appointment>('/appointments', ref =>
      ref.orderByChild('date').startAt(date).endAt(date + "\uf8ff")).valueChanges();
  }

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

  //obtener status
  getStatus(id: string): Observable<any> {
    return this.db.object(`/petStatus/${id}`).valueChanges();
  }
  //ectualizar status
  updateStatus(id: string, status: string): Promise<void> {
    return this.db.object(`/appointments/${id}`).update({ status });
  }
  //eliminar cita  
  deleteAppointment(id: string): Promise<void> {
    return this.db.object(`/appointments/${id}`).remove();
  }
  getProducts(): Observable<Product[]> {
    const products: Product[] = [
      { id: '1', name: 'Corte de pelo', price: 8000 },
      { id: '2', name: 'Corte de Uñas', price: 4000 },
      { id: '3', name: 'Desparacitacion', price: 8000 },
      { id: '4', name: 'Limpieza Dental y Oidos', price: 9000 },
      { id: '5', name: 'Vacunas', price: 15000 },
      { id: '6', name: 'Baño', price: 15000 },
      // Agrega más productos si es necesario
    ];
    
    // Simplemente devolvemos estos productos como un Observable
    return of(products);
  }
  

}

