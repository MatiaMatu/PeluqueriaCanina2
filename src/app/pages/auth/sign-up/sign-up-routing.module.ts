import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpPage } from './sign-up.page';
import { noAuthGuard } from '../../../guards/no-auth.guard'; // Importa el guard noAuthGuard si deseas proteger la página de registro

const routes: Routes = [
  {
    path: '',
    component: SignUpPage,
    canActivate: [noAuthGuard] // Agrega el guard noAuthGuard si deseas proteger la página de registro
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPageRoutingModule {}