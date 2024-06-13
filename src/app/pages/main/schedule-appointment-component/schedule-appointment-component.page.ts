import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { v4 as uuidv4 } from 'uuid';
import { Appointment } from 'src/app/models/appointment.model';
import { Product } from 'src/app/models/product.model';
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
  minDate: string;
  products: Product[] = [];
  selectedProducts: Product[] = [];



  constructor(private citaService: CitaService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.citaService.getProducts().subscribe(products => {
      this.products = products;
    });

    //establecer la fecha actual y establecerla como fecha minima
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;


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
    const currentTime = new Date().toTimeString().split(' ')[0];// Obtener la hora actual

    this.citaService.getAppointmentsByDate(date).pipe(
      map(appointments => appointments.map(app => app.time))
    ).subscribe(bookedTimes => {
      this.availableTimes = generateAvailableTimes(date, bookedTimes, currentTime);
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
    if (this.form.valid && this.selectedProducts.length > 0) {
      const newAppointment: Appointment = {
        ...this.form.value,
        date: `${this.form.value.date}T${this.form.value.date}`,
        id: uuidv4(),
        trackingCode: uuidv4().split('-')[0],
        status: 'Programada',
        userId: (await this.afAuth.currentUser).uid,
        selectedProducts: this.selectedProducts  // Guardar los productos seleccionados en la cita
      };
      this.citaService.createAppointment(newAppointment)
        .then(() => {
          // Limpiar el formulario y los productos seleccionados después de guardar la cita
          this.form.reset();
          this.selectedProducts = [];
          // Mostrar un mensaje de éxito o redirigir a otra página si es necesario
        })
        .catch(error => {
          console.error('Error al agendar cita:', error);
          // Mostrar un mensaje de error o realizar alguna otra acción si falla la creación de la cita
        });
    }
  }
  toggleProductSelection(product: Product) {
    const index = this.selectedProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
  }
  
  isSelected(product: Product): boolean {
    return this.selectedProducts.some(p => p.id === product.id);
  }
  
  calculateTotal(): number {
    let total = 0;
    for (const product of this.selectedProducts) {
      total += product.price;
    }
    return total;
  }

}