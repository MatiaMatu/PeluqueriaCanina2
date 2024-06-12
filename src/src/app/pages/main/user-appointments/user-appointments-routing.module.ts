import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAppointmentsPage } from './user-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: UserAppointmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAppointmentsPageRoutingModule {}
