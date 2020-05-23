import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  content;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.content = this.navParams.get('content');
  }

}
