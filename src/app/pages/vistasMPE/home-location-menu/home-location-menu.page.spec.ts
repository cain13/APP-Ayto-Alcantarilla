import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeLocationMenuPage } from './home-location-menu.page';

describe('HomeLocationMenuPage', () => {
  let component: HomeLocationMenuPage;
  let fixture: ComponentFixture<HomeLocationMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLocationMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeLocationMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
