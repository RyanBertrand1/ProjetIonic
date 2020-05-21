import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoSitePage } from './info-site.page';

describe('InfoSitePage', () => {
  let component: InfoSitePage;
  let fixture: ComponentFixture<InfoSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
