import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-site-map-modal',
  templateUrl: './site-map-modal.component.html',
  styleUrls: ['./site-map-modal.component.scss'],
})
export class SiteMapModalComponent implements OnInit, OnDestroy {

  site;

  map: Leaflet.Map;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.site = this.navParams.get('site');
  }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([this.site.fields.coordinates[0], this.site.fields.coordinates[1]], 13);

    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapboxToken
    }).addTo(this.map);

    Leaflet.marker([this.site.fields.coordinates[0], this.site.fields.coordinates[1]]).addTo(this.map).bindPopup(this.site.fields.site).openPopup();
  }

  public closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnDestroy() {
    this.map.remove();
  }
}
