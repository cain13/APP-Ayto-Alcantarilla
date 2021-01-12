import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TareaMasInfoPage } from './tarea-mas-info.page';

describe('TareaMasInfoPage', () => {
  let component: TareaMasInfoPage;
  let fixture: ComponentFixture<TareaMasInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaMasInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TareaMasInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
