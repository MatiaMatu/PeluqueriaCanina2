import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { noAuthGuard } from '../../guards/no-auth.guard'; // Importa el guard noAuthGuard si deseas proteger la página de registro

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule),
    canActivate: [noAuthGuard] // Agrega el guard noAuthGuard si deseas proteger la página de registro
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}