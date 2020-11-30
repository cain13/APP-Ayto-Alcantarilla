import { TestBed } from '@angular/core/testing';

import { CertificadosAptitudService } from './certificados-aptitud.service';

describe('CertificadosAptitudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificadosAptitudService = TestBed.get(CertificadosAptitudService);
    expect(service).toBeTruthy();
  });
});
