import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
