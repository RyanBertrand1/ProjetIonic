import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SitesService} from '../services/sites.service';
import {environment} from '../../environments/environment';
import {IonInfiniteScroll, ModalController, PopoverController} from '@ionic/angular';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {Router} from '@angular/router';
import {PopoverComponent} from './popover/popover.component';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.page.html',
  styleUrls: ['./sites-list.page.scss'],
})
export class SitesListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  sites;

  currentPage;

  imgURL;

  isLoading;

  filters = {
    search: '',
    category: '',
    region: '',
    states: [],
  };

  constructor(private sitesService: SitesService, private cdr: ChangeDetectorRef, private modalController: ModalController, private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {
    this.imgURL = environment.imgURL;

    this.loadData();
  }

  onScroll() {
    this.currentPage += 1;
    this.infiniteScroll.disabled = true;
    this.sitesService.getSites(this.currentPage, this.filters.search, this.filters.category, this.filters.region, this.filters.states).subscribe(res => {
      this.sites = this.sites.concat(res.records);
      this.cdr.detectChanges();
      if (res.records.length === 20) {
        this.infiniteScroll.disabled = false;
      }
    });
  }

  loadData() {
    this.isLoading = true;
    this.currentPage = 1;
    this.sitesService.getSites(this.currentPage , this.filters.search, this.filters.category, this.filters.region, this.filters.states).subscribe(res => {
      this.sites = res.records;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  async presentSearchModal() {
    const filtersCopy = JSON.parse(JSON.stringify(this.filters));

    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        filters: filtersCopy
      },
      cssClass: 'my-modal'
    });

    modal.onDidDismiss()
        .then((data) => {
          if (data.data.filters) {
           this.filters = data.data.filters;
           this.loadData();
          }
        });
    return await modal.present();
  }

  showDetails(id) {
    this.router.navigate(['/tabs/info-site/', id], {queryParams: {previousPage : 'sites-list'}});
  }

  testChip() {
    return this.filters.search || this.filters.region || this.filters.category || this.filters.states.length > 0;
  }

  deleteFilters() {
    this.filters = {
      search: '',
      category: '',
      region: '',
      states: [],
    };

    this.loadData();
  }

  async presentPopover(ev: any) {
    console.log(ev);

    let content = '';

    switch (ev.target.innerHTML) {
      case 'Query':
        content = this.filters.search;
        break;

      case 'Region':
        content = this.filters.region;
        break;

      case 'Category':
        content = this.filters.category;
        break;

      case 'States':
        content = this.filters.states.join();
        break;
    }

    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {content},
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }
}
