import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapSitesPageRoutingModule } from './map-sites-routing.module';

import { MapSitesPage } from './map-sites.page';
import {MapOptionsModalComponent} from './map-options-modal/map-options-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapSitesPageRoutingModule
  ],
  declarations: [MapSitesPage, MapOptionsModalComponent],
  entryComponents: [MapOptionsModalComponent]
})
export class MapSitesPageModule {}
