import { Component, OnInit, inject } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Appointment } from 'src/app/models/appointment.model';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  trackingCode: string;
  newStatus: string;
  updateMessage: string;
  appointments$: Observable<Appointment[]>;

  firebaseSvc = inject(FirebaseService);

  constructor(private citaService: CitaService,private alertController: AlertController) {}

  ngOnInit() {
    this.appointments$ = this.citaService.getAllAppointments();
    
  }
  
  signOut() {
    this.firebaseSvc.signOut();
   }

  updateStatus() {
    this.citaService.getAppointmentByTrackingCode(this.trackingCode).subscribe(appointment => {
      if (appointment) {
        this.citaService.updateStatus(appointment.id, this.newStatus).then(() => {
          this.updateMessage = 'Estado actualizado correctamente';
        }).catch(error => {
          this.updateMessage = `Error actualizando estado: ${error.message}`;
        });
      } else {
        this.updateMessage = 'Cita no encontrada';
      }
    });
  }
  async editStatus(appointment: Appointment) {
    const newStatus = prompt("Ingrese el nuevo estado para la cita:", appointment.status);
    if (newStatus !== null) {
      this.citaService.updateStatus(appointment.id, newStatus.trim())
        .then(() => {
          this.presentAlert('Éxito', 'Estado actualizado exitosamente');
        })
        .catch(error => {
          this.presentAlert('Error', `Error al actualizar el estado: ${error.message}`);
        });
    }
  }

  async onStatusChange(event: CustomEvent, appointment: Appointment) {
    const newStatus = event.detail.value;
    this.citaService.updateStatus(appointment.id, newStatus)
      .then(() => {
        this.presentAlert('Éxito', 'Estado actualizado exitosamente');
      })
      .catch(error => {
        this.presentAlert('Error', `Error al actualizar el estado: ${error.message}`);
      });
  }
//Eliminar cita de la listaa junto con el confirm
  confirmDelete(appointment: Appointment) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta cita?');
    if (confirmDelete) {
      this.deleteAppointment(appointment.id);
    }
  }
  
  async deleteAppointment(id: string) {
    try {
      await this.citaService.deleteAppointment(id);
      this.presentAlert('Éxito', 'La cita se ha eliminado correctamente.');
    } catch (error) {
      console.error('Error eliminando cita', error);
      this.presentAlert('Error', 'Se produjo un error al eliminar la cita. Por favor, inténtalo de nuevo.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función para calcular el precio total de los productos seleccionados en una cita
  calculateTotalCost(appointment: Appointment): number {
    let totalCost = 0;
    if (appointment.selectedProducts) {
      totalCost = appointment.selectedProducts.reduce((total, product) => total + product.price, 0);
    }
    return totalCost;
  }


  

}


