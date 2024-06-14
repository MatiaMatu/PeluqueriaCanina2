import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciossPage } from './servicioss.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciossPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciossPageRoutingModule {}
