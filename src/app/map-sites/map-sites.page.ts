import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import {ModalController} from '@ionic/angular';
import {environment} from '../../environments/environment';
import {SitesService} from '../services/sites.service';
import {SearchModalComponent} from '../sites-list/search-modal/search-modal.component';
import {MapOptionsModalComponent} from './map-options-modal/map-options-modal.component';

@Component({
  selector: 'app-map-sites',
  templateUrl: './map-sites.page.html',
  styleUrls: ['./map-sites.page.scss'],
})
export class MapSitesPage implements OnInit {

  map: Leaflet.map;

  layers = [];

  currentPosition = {
    latitude : 0,
    longitude: 0
  };

  searchOptions = {
    center : [0, 0],
    radius : 100
  };

  constructor(private modalController: ModalController, private sitesService: SitesService) { }

  ngOnInit() {
  }

  ionViewDidEnter() { if (!this.map){this.leafletMap();} }


  leafletMap() {
    this.map = Leaflet.map('mapId').setView([0, 0], 13);

    this.map.doubleClickZoom.disable();

    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/satellite-streets-v9',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapboxToken
    }).addTo(this.map);

    this.map.locate({setView : true});

    this.map.on('locationfound', (e) => {
      this.currentPosition.latitude = e.latitude;
      this.currentPosition.longitude = e.longitude;
      this.searchOptions.center = [e.latitude, e.longitude];

      this.loadData();
    });

    this.map.on('dblclick', (e) => {
      this.searchOptions.center = [e.latlng.lat, e.latlng.lng];

      this.loadData();
    });
  }

  loadData() {
    this.sitesService.getByPosition(this.searchOptions.center, this.searchOptions.radius).subscribe(res => {

      this.clearMap();

      const icon = Leaflet.icon({
        iconUrl: 'assets/leaflet/images/marker-icon.png',
        shadowUrl: 'assets/leaflet/images/marker-shadow.png',

        popupAnchor:  [0, -40],
        iconAnchor:   [13, 40]
      });

      const userIcon = Leaflet.icon({
        iconUrl: 'assets/leaflet/images/marker-user.png',
        shadowUrl: 'assets/leaflet/images/marker-shadow.png',

        popupAnchor:  [0, -40],
        iconAnchor:   [13, 40]
      });

      const userMarker = Leaflet.marker([this.currentPosition.latitude, this.currentPosition.longitude], {icon: userIcon}).addTo(this.map).bindPopup('Your position');
      this.layers.push(userMarker);

      const circle = Leaflet.circle(this.searchOptions.center, {
        color: '#3880ff',
        fillColor: '#3880ff',
        fillOpacity: 0.5,
        radius: this.searchOptions.radius * 1000
      }).addTo(this.map);

      this.layers.push(circle);

      res.records.forEach(site => {
        const marker = Leaflet.marker([site.fields.coordinates[0], site.fields.coordinates[1]], {icon}).addTo(this.map).bindPopup(site.fields.site + `<br> <a href="/tabs/info-site/${site.recordid}?previousPage=map-sites">Details</a>`);
        this.layers.push(marker);
      });
    });
  }

  async presentSearchModal() {
    const searchOptionsCopy = JSON.parse(JSON.stringify(this.searchOptions));

    const modal = await this.modalController.create({
      component: MapOptionsModalComponent,
      componentProps: {
        searchOptions: searchOptionsCopy
      },
      cssClass: 'my-modal'
    });

    modal.onDidDismiss()
        .then((data) => {
          if (data.data.searchOptions) {
            this.searchOptions = data.data.searchOptions;
            this.map.setView( this.searchOptions.center );
            this.loadData();
          }
        });
    return await modal.present();
  }

  clearMap() {
    this.layers.forEach(layer => {
      this.map.removeLayer(layer);
    });

    this.layers = [];
  }
}
