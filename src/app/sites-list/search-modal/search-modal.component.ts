import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import SearchData from '../../data/search-data';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {

  searchData = SearchData;

  filters;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.filters = this.navParams.get('filters');
  }

  public closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  public search() {
    this.modalController.dismiss({
      dismissed: true,
      filters: this.filters
    });
  }

  public log(x) {
    console.log(x);
  }
}
