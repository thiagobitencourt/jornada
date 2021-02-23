import { TestBed } from '@angular/core/testing';

import { WorkdayConfigService } from './workday-config.service';

describe('WorkdayConfigService', () => {
  let service: WorkdayConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkdayConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
