import { TestBed } from '@angular/core/testing';

import { WorkdayCalculatorService } from './workday-calculator.service';
import { Workday } from '../model/workday.model';
import { RecordType } from '../model/record-type.enum';

fdescribe('WorkdayCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkdayCalculatorService = TestBed.get(WorkdayCalculatorService);
    expect(service).toBeTruthy();
  });

  it('should calculate the total worked minutes', () => {
    const workday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 13:30') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 12:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 17:30') }
      ]
    } as Workday;
    const service: WorkdayCalculatorService = TestBed.get(WorkdayCalculatorService);
    const eigthHoursAsMinutes = 480;

    expect(service.getTotalWorkday(workday)).toEqual(eigthHoursAsMinutes);
  });

  it('should ignore a record without a match record (IN without OUT)');
  it('should ignore a record without a match record (OUT without IN)');
  it('should not calculate a workday without records');

  it('should not break when no records list are passed', () => {
    const service: WorkdayCalculatorService = TestBed.get(WorkdayCalculatorService);
    let totalWorkDay = service.getTotalWorkday({} as Workday);
    expect(totalWorkDay).toEqual(0);

    totalWorkDay = service.getTotalWorkday(null);
    expect(totalWorkDay).toEqual(0);

    totalWorkDay = service.getTotalWorkday(undefined);
    expect(totalWorkDay).toEqual(0);
  });

  it('should calculate the overtime for a worked day');
  it('should return an Overtime object with the given usedAs value');
  it('should return a negative value when the worked day is less than the required time');
});
