import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapSitesPage } from './map-sites.page';

const routes: Routes = [
  {
    path: '',
    component: MapSitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapSitesPageRoutingModule {}
