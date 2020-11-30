import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubrespuestaModalPage } from './subrespuesta-modal.page';

describe('SubrespuestaModalPage', () => {
  let component: SubrespuestaModalPage;
  let fixture: ComponentFixture<SubrespuestaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubrespuestaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubrespuestaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
