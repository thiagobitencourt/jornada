import { TestBed } from '@angular/core/testing';

import { JornadaService } from './jornada.service';

describe('JornadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JornadaService = TestBed.get(JornadaService);
    expect(service).toBeTruthy();
  });
});
