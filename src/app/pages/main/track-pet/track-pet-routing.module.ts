import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackPetPage } from './track-pet.page';

const routes: Routes = [
  {
    path: '',
    component: TrackPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackPetPageRoutingModule {}
