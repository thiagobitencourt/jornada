import { TestBed } from '@angular/core/testing';

import { WorkdayService } from './workday.service';

describe('WorkdayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkdayService = TestBed.get(WorkdayService);
    expect(service).toBeTruthy();
  });
});
