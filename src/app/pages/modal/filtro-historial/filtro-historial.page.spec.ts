import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltroHistorialPage } from './filtro-historial.page';

describe('FiltroHistorialPage', () => {
  let component: FiltroHistorialPage;
  let fixture: ComponentFixture<FiltroHistorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroHistorialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
