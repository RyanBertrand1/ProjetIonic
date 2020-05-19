import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SitesService} from '../services/sites.service';
import {environment} from '../../environments/environment';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.page.html',
  styleUrls: ['./sites-list.page.scss'],
})
export class SitesListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  sites;

  currentPage = 1;

  imgURL;

  constructor(private sitesService: SitesService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.imgURL = environment.imgURL;

    this.sitesService.getSites().subscribe(res => {
      this.sites = res.records;
      this.cdr.detectChanges();
    });
  }

  loadData() {
    this.currentPage += 1;
    console.log(this.currentPage);
    this.infiniteScroll.disabled = true;
    this.sitesService.getSites(this.currentPage).subscribe(res => {
      console.log(res.records);
      this.sites = this.sites.concat(res.records);
      this.cdr.detectChanges();
      if (res.records.length === 20) {
        this.infiniteScroll.disabled = false;
      }
    });
  }

}
