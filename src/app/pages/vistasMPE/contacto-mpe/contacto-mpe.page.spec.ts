import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactoMpePage } from './contacto-mpe.page';

describe('ContactoMpePage', () => {
  let component: ContactoMpePage;
  let fixture: ComponentFixture<ContactoMpePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactoMpePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoMpePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
