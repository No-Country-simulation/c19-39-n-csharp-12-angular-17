import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pacienteGuard } from './paciente.guard';

describe('pacienteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pacienteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
