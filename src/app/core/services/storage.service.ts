import { Injectable } from '@angular/core';
import { eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { Observable, of } from 'rxjs';
import { WorkdayFilter } from '../model/workday-filter';
import { WorkdayRecord } from '../model/workday-record.model';
import { Workday } from '../model/workday.model';
import { UtilService } from './util.service';
import { WorkdayCalculatorService } from './workday-calculator.service';

const WORKDAY_RECORD_KEY = 'WORKDAY_RECORDS';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private utilService: UtilService, private workdayCalculator: WorkdayCalculatorService) {}

// GET /workday?begin="2020-10-08"&end="2020-10-08"
// GET /workday/:id
// DELETE /workday/:id
// GET /workday-record?begin="2020-10-08"&end="2020-10-08"
// GET /workday-record/:id
// POST /workday-record
// PUT /workday-record/:id
// DELETE /workday-record/:id

  getWorkdays({ start, end }: WorkdayFilter): Observable<Workday[]> {
    const workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');
    const workdayList: Workday[] = eachDayOfInterval({ start, end })
      .map(date => this.getWorkdayByDate(workdayRecords, date))
      .reverse()

    return of(workdayList);
  }

  saveWorkdayRecord(workdayRecord: WorkdayRecord): Observable<WorkdayRecord> {
    let workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');
    workdayRecord.id = workdayRecord.id || this.utilService.generateId();
    workdayRecords = this.removeRecordFromList(workdayRecords, workdayRecord);
    workdayRecords.push(workdayRecord);
    localStorage.setItem(WORKDAY_RECORD_KEY, JSON.stringify(workdayRecords));
    return of(workdayRecord);
  }

  removeWorkdayRecord(workday: Workday, workdayRecord: WorkdayRecord): Observable<Workday> {
    let workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');
    workdayRecords = this.removeRecordFromList(workdayRecords, workdayRecord);
    workday.records = this.removeRecordFromList(workday.records, workdayRecord);
    localStorage.setItem(WORKDAY_RECORD_KEY, JSON.stringify(workdayRecords));
    return of(this.workdayCalculator.setTotalsToWorkday(workday));
  }

  getUpdatedWorkday(workday: Workday): Observable<Workday> {
    const workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');
    return of(this.getWorkdayByDate(workdayRecords, workday.date));
  }

  private removeRecordFromList(workdayRecordList: WorkdayRecord[], workdayRecord: WorkdayRecord): WorkdayRecord[] {
    return workdayRecordList.filter(record => record.id !== workdayRecord.id);
  }

  private getWorkdayByDate(workdayRecords: WorkdayRecord[] = [], date: Date): Workday {
    const records = workdayRecords.filter(workdayRecord => isSameDay(date, new Date(workdayRecord.datetime)));
    const workday = { date, records } as Workday;
    return this.workdayCalculator.setTotalsToWorkday(workday);
  }
}
