import { Injectable } from "@angular/core";
import { eachDayOfInterval, isSameDay } from "date-fns";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Config } from "../model/config";
import { OvertimeApiValues } from "../model/overtime-api-values";
import { OvertimeType } from "../model/overtime-type.enum";
import { Overtime } from "../model/overtime.model";
import { WorkdayFilter } from "../model/workday-filter";
import { WorkdayRecord } from "../model/workday-record.model";
import { Workday } from "../model/workday.model";
import { UtilService } from "./util.service";
import { WorkdayCalculatorService } from "./workday-calculator.service";

const WORKDAY_RECORD_KEY = "WORKDAY_RECORDS";
const CONFIG_KEY = "CONFIG_JORNADA";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(
    private utilService: UtilService,
    private workdayCalculator: WorkdayCalculatorService
  ) {}

  saveConfig(config: Config): Observable<Config> {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    return of(config);
  }

  getConfig(): Observable<Config> {
    return of(JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}"));
  }

  getWorkdays({ period }: WorkdayFilter): Observable<Workday[]> {
    const { start, end } = period;
    const workdayList: Workday[] = eachDayOfInterval({ start, end })
      .map((date) => this.getWorkdayByDate(this.getWorkdayRecords(), date))
      .reverse();

    return of(workdayList);
  }

  getStatValues(filter: WorkdayFilter): Observable<OvertimeApiValues> {
    return this.getWorkdays(filter).pipe(
      map((workdays: Workday[]) => {
        return workdays.reduce(
          (statsValue, workday) => {
            if (workday.overtime) {
              statsValue.overtime += this.getOvertimeValue(workday.overtime);
              statsValue.undertime += this.getUndertimeValue(workday.overtime);
              const compotimeValue = this.getComptimeValue(workday.overtime);
              statsValue.comptime += compotimeValue;
              statsValue.comptimeBalance += compotimeValue;
            }
            return statsValue;
          },
          {
            overtime: 0,
            undertime: 0,
            comptime: 0,
            comptimeBalance: 0,
          }
        );
      })
    );
  }

  saveWorkdayRecord(workdayRecord: WorkdayRecord): Observable<WorkdayRecord> {
    workdayRecord.id = workdayRecord.id || this.utilService.generateId();
    const workdayRecords = this.removeRecordFromList(
      this.getWorkdayRecords(),
      workdayRecord
    );

    workdayRecords.push(workdayRecord);
    this.setWordayRecords(workdayRecords);
    return of(workdayRecord);
  }

  removeWorkdayRecord(
    workday: Workday,
    workdayRecord: WorkdayRecord
  ): Observable<Workday> {
    let workdayRecords = this.getWorkdayRecords();
    workdayRecords = this.removeRecordFromList(workdayRecords, workdayRecord);
    workday.records = this.removeRecordFromList(workday.records, workdayRecord);
    this.setWordayRecords(workdayRecords);
    return of(this.workdayCalculator.setTotalsToWorkday(workday));
  }

  getUpdatedWorkday(workday: Workday): Observable<Workday> {
    return of(this.getWorkdayByDate(this.getWorkdayRecords(), workday.date));
  }

  private removeRecordFromList(
    workdayRecordList: WorkdayRecord[],
    workdayRecord: WorkdayRecord
  ): WorkdayRecord[] {
    return workdayRecordList.filter((record) => record.id !== workdayRecord.id);
  }

  private getWorkdayByDate(
    workdayRecords: WorkdayRecord[] = [],
    date: Date
  ): Workday {
    const records = workdayRecords.filter((workdayRecord) =>
      isSameDay(date, new Date(workdayRecord.datetime))
    );
    records.sort(
      (rA, rB) =>
        new Date(rA.datetime).getTime() - new Date(rB.datetime).getTime()
    );

    const workday = { date, records } as Workday;
    return this.workdayCalculator.setTotalsToWorkday(workday);
  }

  private getWorkdayRecords(): WorkdayRecord[] {
    return JSON.parse(localStorage.getItem(WORKDAY_RECORD_KEY) || "[]");
  }

  private setWordayRecords(workdayRecords: WorkdayRecord[]) {
    localStorage.setItem(WORKDAY_RECORD_KEY, JSON.stringify(workdayRecords));
  }

  private getOvertimeValue(overtime: Overtime): number {
    return overtime.total > 0 && overtime.usedAs === OvertimeType.OVERTIME
      ? overtime.total
      : 0;
  }

  private getUndertimeValue(overtime: Overtime): number {
    return overtime.total < 0 && overtime.usedAs === OvertimeType.OVERTIME
      ? overtime.total
      : 0;
  }

  private getComptimeValue(overtime: Overtime): number {
    return overtime.usedAs === OvertimeType.COMPTIME ? overtime.total : 0;
  }
}
