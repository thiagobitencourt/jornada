import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { Workday } from "../model/workday.model";
import { WorkdayRecord } from "../model/workday-record.model";
import { StorageService } from "./storage.service";
import { WorkdayFilter } from "../model/workday-filter";
import { WorkdayStas } from "../model/workday-stats";
import { map } from "rxjs/operators";
import { OvertimeApiValues } from "../model/overtime-api-values";
import { OvertimeValues } from "../model/overtime-values";
import { ColorPattern } from "../model/color-pattern.enum";

@Injectable({
  providedIn: "root",
})
export class WorkdayService {
  constructor(private storage: StorageService) {}

  listWorkdays(filter: WorkdayFilter): Observable<WorkdayStas> {
    return forkJoin([
      this.storage.getWorkdays(filter),
      this.storage.getStatValues(filter),
    ]).pipe(
      map(([workdays, statsValue]) => {
        return {
          workdays,
          statsValue: this.getCompleteStatsValues(statsValue),
        };
      })
    );
  }

  saveWorkdayRecord(workdayRecord: WorkdayRecord): Observable<WorkdayRecord> {
    return this.storage.saveWorkdayRecord(workdayRecord);
  }

  saveWorkdayComment(workday: Workday, comment: string): Observable<Workday> {
    workday.comment = comment;
    return of(workday);
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

  private getCompleteStatsValues({
    overtime,
    undertime,
    comptime,
    comptimeBalance,
  }: OvertimeApiValues): OvertimeValues {
    return {
      overtime: {
        value: overtime,
        label: "Horas extras",
        color: ColorPattern.SUCCESS,
      },
      undertime: {
        value: undertime,
        label: "Horas faltas",
        color: ColorPattern.DANGER,
      },
      comptime: {
        value: comptime,
        label: "Banco de horas",
        color: this.getColorByValue(comptime),
      },
      comptimeBalance: {
        value: comptimeBalance,
        label: "Saldo em banco de horas",
        color: this.getColorByValue(comptimeBalance),
      },
    } as OvertimeValues;
  }

  private getColorByValue(value: number): ColorPattern {
    if (value) {
      return value > 0 ? ColorPattern.SUCCESS : ColorPattern.DANGER;
    }
  }
}
