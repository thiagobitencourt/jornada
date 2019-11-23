import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Workday } from '../model/workday.model';
import { WorkdayRecord } from '../model/workday-record.model';

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {
  workdayRecords: Workday[] = [];
  constructor() {}

  getLastRecord(date: Date): WorkdayRecord {
    return null;
  }

  addWorkdayRecord(record: WorkdayRecord): Observable<void> {
    const workday = this.findWorkdayRecord(record.datetime);
    if (workday) {
      workday.records.push(record);
    } else {
      this.workdayRecords.push({ date: record.datetime, records: [record] } as Workday);
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
