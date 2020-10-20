import { Injectable } from '@angular/core';
import { Workday } from '../model/workday.model';
import { Overtime } from '../model/overtime.model';
import { OvertimeType } from '../model/overtime-type.enum';
import { RecordType } from '../model/record-type.enum';
import { WorkdayRecord } from '../model/workday-record.model';
import { compareAsc } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class WorkdayCalculatorService {
  fullWorkdayMinutes = 528;
  constructor() {}

  getTotalWorkday(workday: Workday): number {
    const records = [ ...(workday && workday.records || []) ];
    records.sort((recordA, recordB) => compareAsc(new Date(recordA.datetime), new Date(recordB.datetime)));

    let lastInRecord: WorkdayRecord;
    const totalWorkdayMilliseconds = records.reduce((total, workdayRecord) => {
      let workedTime = 0;
      if (this.isIN(workdayRecord)) {
        lastInRecord = lastInRecord || workdayRecord;
      } else if (lastInRecord) {
        workedTime = workdayRecord.datetime.getTime() - lastInRecord.datetime.getTime();
        lastInRecord = null;
      }
      return total + workedTime;
    }, 0);

    return (totalWorkdayMilliseconds / 1000) / 60;
  }

  getOvertime(totalWorkday: number, usedAs: OvertimeType = OvertimeType.OVERTIME): Overtime {
    const overtime = {
      usedAs,
      total: totalWorkday - this.fullWorkdayMinutes
    } as Overtime;
    return overtime;
  }

  private isIN({ recordType }: WorkdayRecord): boolean {
    return recordType === RecordType.IN;
  }
}
