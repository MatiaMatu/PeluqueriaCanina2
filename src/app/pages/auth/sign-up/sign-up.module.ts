import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importamos ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, // Usamos ReactiveFormsModule en lugar de FormsModule
    IonicModule,
    SignUpPageRoutingModule,
    SharedModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
