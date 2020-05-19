import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitesListPage } from './sites-list.page';

const routes: Routes = [
  {
    path: '',
    component: SitesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesListPageRoutingModule {}
