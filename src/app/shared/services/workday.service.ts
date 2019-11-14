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
    this.workdayRecords.push({ date: record.datetime, records: [record] } as Workday);
    return of(null);
  }

  listWorkdays(): Observable<Workday[]> {
    return of(this.workdayRecords);
  }
}
