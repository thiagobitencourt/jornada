import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Workday } from '../model/workday.model';
import { WorkdayRecord } from '../model/workday-record.model';
import { WorkdayCalculatorService } from './workday-calculator.service';
import { OvertimeType } from '../model/overtime-type.enum';

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {
  workdayRecords: Workday[] = [];
  constructor(private workdayCalculator: WorkdayCalculatorService) {}

  getLastRecord(): WorkdayRecord {
    if (this.workdayRecords && this.workdayRecords.length) {
      const { records } = this.workdayRecords[this.workdayRecords.length - 1];
      return records[records.length - 1];
    }
    return {} as WorkdayRecord;
  }

  addWorkdayRecord(record: WorkdayRecord): Observable<void> {
    const workday = this.findWorkdayRecord(record.datetime);
    if (workday) {
      workday.records.push(record);
      workday.totalWorkday = this.workdayCalculator.getTotalWorkday(workday);
      workday.overtime = this.workdayCalculator.getOvertime(workday.totalWorkday, OvertimeType.OVERTIME)
    } else {
      const newWorkDay = { date: record.datetime, records: [record] } as Workday;
      newWorkDay.totalWorkday = this.workdayCalculator.getTotalWorkday(newWorkDay);
      newWorkDay.overtime = this.workdayCalculator.getOvertime(newWorkDay.totalWorkday, OvertimeType.OVERTIME)
      this.workdayRecords.push(newWorkDay);
    }
    return of(null);
  }

  listWorkdays(): Observable<Workday[]> {
    return of(this.workdayRecords);
  }

  private findWorkdayRecord(date: Date) {
    const dateString = this.getDateString(date);
    return this.workdayRecords.find((workday: Workday) => {
      const currentWorkDayDateString = this.getDateString(workday.date);
      return currentWorkDayDateString === dateString;
    });
  }

  private getDateString(date: Date) {
    return `${date.getDay()}/${date.getDate()}/${date.getFullYear()}`;
  }
}
