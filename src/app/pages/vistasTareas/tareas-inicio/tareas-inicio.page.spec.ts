import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TareasInicioPage } from './tareas-inicio.page';

describe('TareasInicioPage', () => {
  let component: TareasInicioPage;
  let fixture: ComponentFixture<TareasInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TareasInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
