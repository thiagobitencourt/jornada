import { Injectable } from "@angular/core";
import { eachDayOfInterval, isSameDay } from "date-fns";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ColorPattern } from "../model/color-pattern.enum";
import { OvertimeType } from "../model/overtime-type.enum";
import { OvertimeValues } from "../model/overtime-values";
import { Overtime } from "../model/overtime.model";
import { WorkdayFilter } from "../model/workday-filter";
import { WorkdayRecord } from "../model/workday-record.model";
import { Workday } from "../model/workday.model";
import { UtilService } from "./util.service";
import { WorkdayCalculatorService } from "./workday-calculator.service";

const WORKDAY_RECORD_KEY = "WORKDAY_RECORDS";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(
    private utilService: UtilService,
    private workdayCalculator: WorkdayCalculatorService
  ) {}

  getWorkdays({ period }: WorkdayFilter): Observable<Workday[]> {
    const { start, end } = period;
    const workdayList: Workday[] = eachDayOfInterval({ start, end })
      .map((date) => this.getWorkdayByDate(this.getWorkdayRecords(), date))
      .reverse();

    return of(workdayList);
  }

  getStatValues(filter: WorkdayFilter): Observable<OvertimeValues> {
    return this.getWorkdays(filter).pipe(
      map((workdays: Workday[]) => {
        return workdays.reduce(
          (statsValue, workday) => {
            if (workday.overtime) {
              if (this.isOvertime(workday.overtime)) {
                statsValue.overtime.value += workday.overtime.total;
              }

              if (this.isUndertime(workday.overtime)) {
                statsValue.undertime.value += workday.overtime.total;
              }

              if (this.isComptime(workday.overtime)) {
                statsValue.comptime.value += workday.overtime.total;
                statsValue.comptimeBalance.value += workday.overtime.total;

                statsValue.comptime.color =
                  statsValue.comptime.value < 0
                    ? ColorPattern.DANGER
                    : ColorPattern.SUCCESS;
                statsValue.comptimeBalance.color =
                  statsValue.comptimeBalance.value < 0
                    ? ColorPattern.DANGER
                    : ColorPattern.SUCCESS;
              }
            }
            return statsValue;
          },
          {
            overtime: {
              value: 0,
              label: "Horas extras",
              color: ColorPattern.SUCCESS,
            },
            undertime: {
              value: 0,
              label: "Horas faltas",
              color: ColorPattern.DANGER,
            },
            comptime: { value: 0, label: "Banco de horas" },
            comptimeBalance: { value: 0, label: "Saldo em banco de horas" },
          } as OvertimeValues
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

  private isOvertime(overtime: Overtime) {
    return overtime.total > 0 && overtime.usedAs === OvertimeType.OVERTIME;
  }

  private isUndertime(overtime: Overtime) {
    return overtime.total < 0 && overtime.usedAs === OvertimeType.OVERTIME;
  }

  private isComptime(overtime: Overtime) {
    return overtime.usedAs === OvertimeType.COMPTIME;
  }
}
