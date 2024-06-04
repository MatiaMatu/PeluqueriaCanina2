import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  appointmentId: string;
  status: string;

  constructor(private petService: CitaService) {}

  updateStatus() {
    this.petService.updateStatus(this.appointmentId, this.status);
  }

  ngOnInit() {
  }

}
