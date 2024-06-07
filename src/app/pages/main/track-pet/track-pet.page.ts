/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-track-pet',
  templateUrl: './track-pet.page.html',
  styleUrls: ['./track-pet.page.scss'],
})
export class TrackPetPage implements OnInit {

  trackingCode: string;
  status$: Observable<string>;
  errorMessage: string;

  constructor(private petService: CitaService) {}

  trackPet() {
    this.status$ = this.petService.getAppointmentByTrackingCode(this.trackingCode).pipe(
      map(appointment => appointment.status),
      catchError(error => {
        this.errorMessage = error.message;
        return [];
      })
    );
  }

  ngOnInit() {}
}

