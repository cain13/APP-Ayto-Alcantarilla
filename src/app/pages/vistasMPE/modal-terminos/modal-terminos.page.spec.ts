import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTerminosPage } from './modal-terminos.page';

describe('ModalTerminosPage', () => {
  let component: ModalTerminosPage;
  let fixture: ComponentFixture<ModalTerminosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTerminosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTerminosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
