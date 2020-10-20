import { Injectable } from '@angular/core';
import { eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { Observable, of } from 'rxjs';
import { WorkdayFilter } from '../model/workday-filter';
import { WorkdayRecord } from '../model/workday-record.model';
import { Workday } from '../model/workday.model';
import { UtilService } from './util.service';
import { WorkdayCalculatorService } from './workday-calculator.service';

const WORKDAY_KEY = 'WORKDAYS';
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
    const workdays: Workday[] = JSON.parse(localStorage.getItem(WORKDAY_KEY) || '[]');
    const workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');

    const workdayList: Workday[] = eachDayOfInterval({ start, end })
      .map(date => this.getWorkdayByDate(workdays, date))
      .map(workday => {
        workday.records = this.getWorkdayRecords(workdayRecords, new Date(workday.date));
        return workday;
      })
      .reverse()

    return of(workdayList);
  }

  saveWorkdayRecord(workdayRecord: WorkdayRecord): Observable<WorkdayRecord> {
    let workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');
    workdayRecord.id = workdayRecord.id || this.utilService.generateId();
    workdayRecords = this.removeRecordFromList(workdayRecords, workdayRecord);
    workdayRecords.push(workdayRecord);
    localStorage.setItem(WORKDAY_RECORD_KEY, JSON.stringify(workdayRecords));
    this.updateWorkday(workdayRecord.datetime);
    return of(workdayRecord);
  }

  removeWorkdayRecord(workdayRecord: WorkdayRecord): Observable<WorkdayRecord> {
    let workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');
    workdayRecords = this.removeRecordFromList(workdayRecords, workdayRecord);
    localStorage.setItem(WORKDAY_RECORD_KEY, JSON.stringify(workdayRecords));
    this.updateWorkday(workdayRecord.datetime);
    return of(workdayRecord);
  }

  private updateWorkday(date: Date): Workday {
    const workdays: Workday[] = JSON.parse(localStorage.getItem(WORKDAY_KEY) || '[]');
    const workdayRecords: WorkdayRecord[] = JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || '[]');

    const workdayIndex = workdays.findIndex(workday => isSameDay(date, new Date(workday.date)));
    const records = this.getWorkdayRecords(workdayRecords, date);
    const workday = this.getEmptyWorkday(date);

    workday.records = records;
    workday.totalWorkday = this.workdayCalculator.getTotalWorkday(workday);
    workday.overtime = this.workdayCalculator.getOvertime(workday.totalWorkday);

    delete workday.records;

    if (workdayIndex > -1) {
      workdays[workdayIndex] = workday;
    } else {
      workdays.push(workday);
    }

    localStorage.setItem(WORKDAY_KEY, JSON.stringify(workdays));
    return workday;
  }

  private removeRecordFromList(workdayRecordList: WorkdayRecord[], workdayRecord: WorkdayRecord): WorkdayRecord[] {
    return workdayRecordList.filter(record => record.id !== workdayRecord.id);
  }

  private getWorkdayByDate(workdays: Workday[] = [], date: Date): Workday {
    const workday = workdays.find(workday => isSameDay(date, new Date(workday.date)));
    return workday || this.getEmptyWorkday(date);
  }

  private getEmptyWorkday(date: Date): Workday {
    return { date, records: [] };
  }

  private getWorkdayRecords(workdayRecords: WorkdayRecord[] = [], date: Date): WorkdayRecord[] {
    return workdayRecords.filter(workdayRecord => isSameDay(date, new Date(workdayRecord.datetime)));
  }
}
