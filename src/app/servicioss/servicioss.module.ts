import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciossPageRoutingModule } from './servicioss-routing.module';

import { ServiciossPage } from './servicioss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciossPageRoutingModule
  ],
  declarations: [ServiciossPage]
})
export class ServiciossPageModule {}
