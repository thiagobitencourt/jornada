import { Injectable } from '@angular/core';
import { Workday } from '../model/workday.model';
import { Overtime } from '../model/overtime.model';
import { OvertimeType } from '../model/overtime-type.enum';
import { RecordType } from '../model/record-type.enum';

@Injectable({
  providedIn: 'root'
})
export class WorkdayCalculatorService {
  fullWorkdayMinutes = 528;
  constructor() {}

  getTotalWorkday({ records }: Workday): number {
    let totalWorkday = 0;
    
    const ins = records.filter(({ recordType }) => recordType === RecordType.IN).map(({ datetime }) => datetime);
    const outs = records.filter(({ recordType }) => recordType === RecordType.OUT).map(({ datetime }) => datetime);

    const totalWorkdayMilliseconds: number = ins.map((inDatetime, index) => {
      const outDatetime: Date = outs[index]; 
      if (typeof outDatetime !== 'undefined') {
        return outDatetime.getTime() - inDatetime.getTime();
      }
      return 0;
    }).reduce((total, time) => (total + time), 0);

    totalWorkday = ((totalWorkdayMilliseconds / 1000) / 60);
    return totalWorkday;
  }

  getOvertime(totalWorkday: number, usedAs: OvertimeType): Overtime {
    const overtime = {
      usedAs,
      total: totalWorkday - this.fullWorkdayMinutes
    } as Overtime;
    return overtime;
  }
}
