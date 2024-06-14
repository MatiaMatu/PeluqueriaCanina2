import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import { ScheduleAppointmentComponentPage } from './pages/main/schedule-appointment-component/schedule-appointment-component.page';
import { TrackPetPage } from './pages/main/track-pet/track-pet.page';
import { EmployeePage } from './pages/employee/employee.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [noAuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule), canActivate: [noAuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule), canActivate: [authGuard]
  },
  {
    path: 'main/schedule-appointment-component', component: ScheduleAppointmentComponentPage,
    loadChildren: () => import('./pages/main/schedule-appointment-component/schedule-appointment-component.module').then( m => m.ScheduleAppointmentComponentPageModule), canActivate: [authGuard]
  },
  {
    path: 'main/track-pet', component: TrackPetPage,
    loadChildren: () => import('./pages/main/track-pet/track-pet.module').then( m => m.TrackPetPageModule), canActivate: [authGuard]
  },
  {
    path: 'employee', component: EmployeePage,
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule), canActivate: [authGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
