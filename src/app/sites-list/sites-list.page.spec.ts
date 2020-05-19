import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SitesListPage } from './sites-list.page';

describe('SitesListPage', () => {
  let component: SitesListPage;
  let fixture: ComponentFixture<SitesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SitesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
