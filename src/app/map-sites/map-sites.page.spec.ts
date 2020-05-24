import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapSitesPage } from './map-sites.page';

describe('MapSitesPage', () => {
  let component: MapSitesPage;
  let fixture: ComponentFixture<MapSitesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSitesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapSitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
