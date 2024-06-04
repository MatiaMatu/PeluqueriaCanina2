import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleAppointmentComponentPageRoutingModule } from './schedule-appointment-component-routing.module';

import { ScheduleAppointmentComponentPage } from './schedule-appointment-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleAppointmentComponentPageRoutingModule
  ],
  declarations: [ScheduleAppointmentComponentPage]
})
export class ScheduleAppointmentComponentPageModule {}
