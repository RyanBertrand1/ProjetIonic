import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoSitePage } from './info-site.page';

const routes: Routes = [
  {
    path: '',
    component: InfoSitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoSitePageRoutingModule {}
