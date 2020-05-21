import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SitesService} from '../services/sites.service';
import {environment} from '../../environments/environment';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {Router} from '@angular/router';

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

  isLoading = true;

  constructor(private sitesService: SitesService, private cdr: ChangeDetectorRef, private modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.imgURL = environment.imgURL;

    this.sitesService.getSites(this.currentPage).subscribe(res => {
      this.sites = res.records;
      this.isLoading = false;
      this.cdr.detectChanges();
      console.log(this.sites);
    });
  }

  loadData() {
    this.currentPage += 1;
    this.infiniteScroll.disabled = true;
    this.sitesService.getSites(this.currentPage).subscribe(res => {
      this.sites = this.sites.concat(res.records);
      this.cdr.detectChanges();
      if (res.records.length === 20) {
        this.infiniteScroll.disabled = false;
      }
    });
  }

  async presentSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent
    });

    return await modal.present();
  }

  showDetails(id) {
    this.router.navigate(['/tabs/info-site', id]);
  }
}
