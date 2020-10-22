import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workday } from '../model/workday.model';
import { WorkdayRecord } from '../model/workday-record.model';
import { StorageService } from './storage.service';
import { WorkdayFilter } from '../model/workday-filter';

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {
  constructor(private storage: StorageService) {}

  listWorkdays(filter: WorkdayFilter): Observable<Workday[]> {
    return this.storage.getWorkdays(filter);
  }

  saveWorkdayRecord(workdayRecord: WorkdayRecord): Observable<WorkdayRecord> {
    return this.storage.saveWorkdayRecord(workdayRecord);
  }

  removerWorkdayRecord(workday: Workday, workdayRecord: WorkdayRecord): Observable<Workday> {
    return this.storage.removeWorkdayRecord(workday, workdayRecord);
  }

  getUpdatedWorkday(workday: Workday): Observable<Workday> {
    return this.storage.getUpdatedWorkday(workday);
  }
}
