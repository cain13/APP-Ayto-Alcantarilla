import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltroDocumentosPage } from './filtro-documentos.page';

describe('FiltroDocumentosPage', () => {
  let component: FiltroDocumentosPage;
  let fixture: ComponentFixture<FiltroDocumentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroDocumentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroDocumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
