import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoSitePageRoutingModule } from './info-site-routing.module';

import { InfoSitePage } from './info-site.page';
import {SiteMapModalComponent} from './site-map-modal/site-map-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoSitePageRoutingModule
  ],
  declarations: [InfoSitePage, SiteMapModalComponent],
  entryComponents: [SiteMapModalComponent]
})
export class InfoSitePageModule {}
