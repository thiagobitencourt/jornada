import { TestBed } from '@angular/core/testing';

import { WorkdayCalculatorService } from './workday-calculator.service';

describe('WorkdayCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkdayCalculatorService = TestBed.get(WorkdayCalculatorService);
    expect(service).toBeTruthy();
  });
});
