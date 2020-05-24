import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map-options-modal',
  templateUrl: './map-options-modal.component.html',
  styleUrls: ['./map-options-modal.component.scss'],
})
export class MapOptionsModalComponent implements OnInit {

  searchOptions;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.searchOptions = this.navParams.get('searchOptions');
    console.log(this.searchOptions);
  }

  public closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  search() {
    this.modalController.dismiss({
      dismissed: true,
      searchOptions: this.searchOptions
    });
  }

  chooseUserPosition() {
    const map = Leaflet.map('invisibleMap').setView([0, 0], 13);

    map.locate();

    map.on('locationfound', (e) => {
      console.log(e);

      this.searchOptions.center = [e.latitude, e.longitude];

      map.remove();
    });
  }
}
