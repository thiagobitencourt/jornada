import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { Workday } from "../model/workday.model";
import { WorkdayRecord } from "../model/workday-record.model";
import { StorageService } from "./storage.service";
import { WorkdayFilter } from "../model/workday-filter";
import { WorkdayStas } from "../model/workday-stats";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WorkdayService {
  constructor(private storage: StorageService) {}

  listWorkdays(filter: WorkdayFilter): Observable<WorkdayStas> {
    return forkJoin([
      this.storage.getWorkdays(filter),
      this.storage.getStatValues(filter),
    ]).pipe(map(([workdays, statsValue]) => ({ workdays, statsValue })));
  }

  saveWorkdayRecord(workdayRecord: WorkdayRecord): Observable<WorkdayRecord> {
    return this.storage.saveWorkdayRecord(workdayRecord);
  }

  removerWorkdayRecord(
    workday: Workday,
    workdayRecord: WorkdayRecord
  ): Observable<Workday> {
    return this.storage.removeWorkdayRecord(workday, workdayRecord);
  }

  getUpdatedWorkday(workday: Workday): Observable<Workday> {
    return this.storage.getUpdatedWorkday(workday);
  }
}
