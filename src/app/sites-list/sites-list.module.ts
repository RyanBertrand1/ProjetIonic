import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitesListPageRoutingModule } from './sites-list-routing.module';

import { SitesListPage } from './sites-list.page';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {PopoverComponent} from './popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitesListPageRoutingModule
  ],
  declarations: [SitesListPage, SearchModalComponent, PopoverComponent],
  entryComponents: [SearchModalComponent, PopoverComponent]
})
export class SitesListPageModule {}
