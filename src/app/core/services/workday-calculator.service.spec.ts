import { TestBed } from '@angular/core/testing';

import { WorkdayCalculatorService } from './workday-calculator.service';
import { Workday } from '../model/workday.model';
import { RecordType } from '../model/record-type.enum';
import { OvertimeType } from '../model/overtime-type.enum';

fdescribe('WorkdayCalculatorService', () => {
  let service: WorkdayCalculatorService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(WorkdayCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not change the original workday object', () => {
    const workday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 13:30') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 12:00') }
      ]
    } as Workday;

    service.getTotalWorkday(workday);
    expect(workday.records[1].datetime).toEqual(new Date('2020-01-01 13:30'));
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
    const eigthHoursAsMinutes = 480;

    expect(service.getTotalWorkday(workday)).toEqual(eigthHoursAsMinutes);
  });

  it('should calculate the total worked minutes with more than 4 records', () => {
    const workday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 12:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 13:30') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 17:30') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 20:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 22:00') }
      ]
    } as Workday;
    const tenHoursAsMinutes = 600;

    expect(service.getTotalWorkday(workday)).toEqual(tenHoursAsMinutes);
  });

  it('should calculate workday across multiple days', () => {
    const multiWorkday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-02 08:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-02 20:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-03 02:00') }
      ]
    } as Workday;

    const thirtyHoursAsMinutes = 1800;
    expect(service.getTotalWorkday(multiWorkday)).toEqual(thirtyHoursAsMinutes);
  });

  it('should ignore a record without a match record (IN without OUT)', () => {
    const halfWorkday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 13:30') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 12:00') }
      ]
    } as Workday;
    
    const invalidWorkday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 13:30') }
      ]
    } as Workday;

    const fourHoursAsMinutes = 240;
    const notWorkedAtAll = 0;

    expect(service.getTotalWorkday(halfWorkday)).toEqual(fourHoursAsMinutes);
    expect(service.getTotalWorkday(invalidWorkday)).toEqual(notWorkedAtAll);
  });

  it('should ignore a record without a match record (OUT without IN)', () => {
    const halfWorkday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 13:30') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 12:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 17:30') }
      ]
    } as Workday;
    
    const invalidWorkday = {
      records: [
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 12:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 17:30') }
      ]
    } as Workday;

    const fourHoursAsMinutes = 240;
    const notWorkedAtAll = 0;

    expect(service.getTotalWorkday(halfWorkday)).toEqual(fourHoursAsMinutes);
    expect(service.getTotalWorkday(invalidWorkday)).toEqual(notWorkedAtAll);
  });

  it('should not calculate a workday with only IN records', () => {
    const invalidWorkday = {
      records: [
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 12:00') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 13:30') },
        { recordType: RecordType.IN, datetime: new Date('2020-01-01 17:30') }
      ]
    } as Workday;

    expect(service.getTotalWorkday(invalidWorkday)).toEqual(0);
  });

  it('should not calculate a workday with only OUT records', () => {
    const invalidWorkday = {
      records: [
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 08:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 12:00') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 13:30') },
        { recordType: RecordType.OUT, datetime: new Date('2020-01-01 17:30') }
      ]
    } as Workday;

    expect(service.getTotalWorkday(invalidWorkday)).toEqual(0);
  });

  it('should not calculate a workday without records', () => {
    let totalWorkDay = service.getTotalWorkday({} as Workday);
    expect(totalWorkDay).toEqual(0);

    totalWorkDay = service.getTotalWorkday(null);
    expect(totalWorkDay).toEqual(0);

    totalWorkDay = service.getTotalWorkday(undefined);
    expect(totalWorkDay).toEqual(0);
  });

  it('should calculate the overtime for a worked day', () => {
    const eigthHoursAsMinutes = 480;
    const tenHoursAsMinutes = 600;
    const overtimeObject = { usedAs: OvertimeType.OVERTIME, total: 120 }
    
    service.fullWorkdayMinutes = eigthHoursAsMinutes;
    expect(service.getOvertime(tenHoursAsMinutes, OvertimeType.OVERTIME)).toEqual(overtimeObject);
  });

  it('should return an Overtime object with the given usedAs value', () => {
    const eigthHoursAsMinutes = 480;

    let overtimeObject = service.getOvertime(eigthHoursAsMinutes, OvertimeType.OVERTIME);
    expect(overtimeObject.usedAs).toEqual(OvertimeType.OVERTIME);

    overtimeObject = service.getOvertime(eigthHoursAsMinutes, OvertimeType.COMPTIME);
    expect(overtimeObject.usedAs).toEqual(OvertimeType.COMPTIME);
  });

  it('should return a negative value when the worked day is less than the required time', () => {
    const eigthHoursAsMinutes = 480;
    const fiveHoursAsMinutes = 300;

    const overtimeObject = { usedAs: OvertimeType.OVERTIME, total: -180 }
    service.fullWorkdayMinutes = eigthHoursAsMinutes;
    expect(service.getOvertime(fiveHoursAsMinutes, OvertimeType.OVERTIME)).toEqual(overtimeObject);
  });
});
