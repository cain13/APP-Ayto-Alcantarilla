import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConstruccionPage } from './construccion.page';

describe('ConstruccionPage', () => {
  let component: ConstruccionPage;
  let fixture: ComponentFixture<ConstruccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstruccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConstruccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
