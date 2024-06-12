import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleAppointmentComponentPage } from './schedule-appointment-component.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleAppointmentComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleAppointmentComponentPageRoutingModule {}
