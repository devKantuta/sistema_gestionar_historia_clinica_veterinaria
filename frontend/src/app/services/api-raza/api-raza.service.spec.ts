import { TestBed } from '@angular/core/testing';

import { ApiRazaService } from './api-raza.service';

describe('ApiRazaService', () => {
  let service: ApiRazaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRazaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
