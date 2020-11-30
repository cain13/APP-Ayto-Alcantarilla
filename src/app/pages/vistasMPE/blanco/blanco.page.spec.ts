import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlancoPage } from './blanco.page';

describe('BlancoPage', () => {
  let component: BlancoPage;
  let fixture: ComponentFixture<BlancoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlancoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlancoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
