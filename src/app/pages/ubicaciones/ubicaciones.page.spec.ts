import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbicacionesPage } from './ubicaciones.page';

describe('UbicacionesPage', () => {
  let component: UbicacionesPage;
  let fixture: ComponentFixture<UbicacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
