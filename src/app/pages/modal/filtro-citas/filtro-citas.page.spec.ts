import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltroCitasPage } from './filtro-citas.page';

describe('FiltroCitasPage', () => {
  let component: FiltroCitasPage;
  let fixture: ComponentFixture<FiltroCitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCitasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
