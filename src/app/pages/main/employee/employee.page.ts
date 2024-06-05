import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Appointment } from 'src/app/models/appointment.model';
import { Observable } from 'rxjs';
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

  constructor(private citaService: CitaService) {}

  ngOnInit() {
    this.appointments$ = this.citaService.getAllAppointments();
    
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
}
