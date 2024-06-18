/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Observable,of } from 'rxjs';
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
  isLoading: boolean = false;

  // Definir los estados posibles
  steps: string[] = [
    'Llegada Confirmada',
    'En espera',
    'En proceso!',
    'Listo para retirar!'
  ];

  stateGifs: { [key: string]: string } = {
    'Llegada Confirmada': 'assets/gif/giphy1.webp',
    'En espera': 'assets/gif/giphy2.webp',
    'En proceso!': 'assets/gif/giphy3.webp',
    'Listo para retirar!': 'assets/gif/giphy4.webp'
  };

  constructor(private petService: CitaService) {}

  trackPet() {
    if (!this.trackingCode) {
      this.errorMessage = 'Por favor, ingrese un código de seguimiento válido';
      return;
    }

    this.isLoading = true;
    this.status$ = this.petService.getAppointmentByTrackingCode(this.trackingCode).pipe(
      map(appointment => {
        this.errorMessage = null;
        this.isLoading = false;
        return appointment.status;
      }),
      catchError(error => {
        this.errorMessage = 'No se pudo encontrar el estado para el código proporcionado';
        this.isLoading = false;
        return of(null);
      })
    );
  }


  ngOnInit() {}
  // Método para verificar si un paso está activo
  isActiveStep(index: number, currentStatus: string): boolean {
    const currentStepIndex = this.steps.indexOf(currentStatus);
    return index <= currentStepIndex;
  }
  getGifForStatus(status: string): string {
    return this.stateGifs[status] || '';
  }
}