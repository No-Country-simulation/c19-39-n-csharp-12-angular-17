import { TestBed } from '@angular/core/testing';

import { HorariosService } from './horarios.service';

describe('HorariosService', () => {
  let service: HorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
