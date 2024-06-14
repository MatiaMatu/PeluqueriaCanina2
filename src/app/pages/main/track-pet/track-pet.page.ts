/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit,inject } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-track-pet',
  templateUrl: './track-pet.page.html',
  styleUrls: ['./track-pet.page.scss'],
})
export class TrackPetPage implements OnInit {
  firebaseSvc = inject(FirebaseService);

  trackingCode: string;
  status$: Observable<string>;
  errorMessage: string;
  isLoading: boolean = false;

  // Definir los estados posibles
  steps: string[] = [
    'Conociendo a su mascota',
    'En progreso',
    'Listo para retirar',
    'Cancelada'
  ];

  constructor(private petService: CitaService) {}
  signOut() {
    this.firebaseSvc.signOut();
   }
  
  

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

}