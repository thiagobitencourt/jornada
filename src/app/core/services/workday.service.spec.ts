import { TestBed } from '@angular/core/testing';

import { WorkdayService } from './workday.service';
import { OvertimeType } from '../model/overtime-type.enum';
import { RecordType } from '../model/record-type.enum';

fdescribe('WorkdayService', () => {
  let service: WorkdayService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(WorkdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of workday records', () => {
    service.listWorkdays().subscribe(records => {
      expect(records).toEqual([]);
    });

    service.workdayRecords = [{
      date: new Date(),
      totalWorkday: 0,
      overtime: {
        total: 0,
        usedAs: OvertimeType.OVERTIME
      },
      records: [{
        datetime: new Date(),
        recordType: RecordType.IN,
        message: 'any message'
      }]
    }];

    service.listWorkdays().subscribe(records => {
      expect(records.length).toEqual(1);
    });
  });

  it('should add a new workday entry with a workday record');
  it('should calculate the workday and the overtime totals for the new workday entry');
  it('should add a record to an existing workday entry');
  it('should recalculate the workday and overtime totals to the existing workday entry');
});
