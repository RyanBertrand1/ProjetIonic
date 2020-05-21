import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SitesService} from '../services/sites.service';
import {SearchModalComponent} from '../sites-list/search-modal/search-modal.component';
import {ModalController} from '@ionic/angular';
import {SiteMapModalComponent} from './site-map-modal/site-map-modal.component';

@Component({
  selector: 'app-info-site',
  templateUrl: './info-site.page.html',
  styleUrls: ['./info-site.page.scss'],
})
export class InfoSitePage implements OnInit {

  recordid;
  site;
  imgUrls = [];
  isLoading = true;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private route: ActivatedRoute, private sitesService: SitesService, private cdr: ChangeDetectorRef, private modalController: ModalController) { }

  ngOnInit() {
    this.recordid = this.route.snapshot.params.id;

    this.sitesService.getSiteById(this.recordid).subscribe(res => {
      this.site = res.records[0];
      this.isLoading = false;
      this.cdr.detectChanges();

      this.httpGetAsync('https://whc.unesco.org/en/list/' + this.site.fields.id_number + '/gallery/&maxrows=10', (data) => {
        const el = document.createElement( 'html' );
        el.innerHTML = data;
        const imgs = el.getElementsByClassName('icaption-img');
        for (let k = 0; k < imgs.length; k++) {
          this.imgUrls.push(imgs[k].getAttribute('data-src'));
        }
        this.cdr.detectChanges();
      });
    });

  }

  httpGetAsync(theUrl, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.open('GET', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  async presentMapModal() {
    const modal = await this.modalController.create({
      component: SiteMapModalComponent,
      componentProps: {
        site: this.site
      }
    });

    return await modal.present();
  }
}
