import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackPetPageRoutingModule } from './track-pet-routing.module';

import { TrackPetPage } from './track-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackPetPageRoutingModule
  ],
  declarations: [TrackPetPage]
})
export class TrackPetPageModule {}
