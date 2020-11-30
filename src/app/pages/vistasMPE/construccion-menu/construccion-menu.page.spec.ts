import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConstruccionMenuPage } from './construccion-menu.page';

describe('ConstruccionMenuPage', () => {
  let component: ConstruccionMenuPage;
  let fixture: ComponentFixture<ConstruccionMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstruccionMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConstruccionMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
