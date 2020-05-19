import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SitesService} from '../services/sites.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.page.html',
  styleUrls: ['./sites-list.page.scss'],
})
export class SitesListPage implements OnInit {

  sites;

  imgURL;

  constructor(private sitesService: SitesService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.imgURL = environment.imgURL;

    this.sitesService.getSites().subscribe(res => {
      this.sites = res.records;
      this.cdr.detectChanges();
    });
  }

}
