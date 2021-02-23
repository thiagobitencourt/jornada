import { Injectable } from "@angular/core";
import { Workday } from "../model/workday.model";
import { Overtime } from "../model/overtime.model";
import { OvertimeType } from "../model/overtime-type.enum";
import { compareAsc, differenceInMinutes } from "date-fns";
import { WorkdayConfigService } from "./workday-config.service";

@Injectable({
  providedIn: "root",
})
export class WorkdayCalculatorService {
  constructor(private workdayConfig: WorkdayConfigService) {}

  setTotalsToWorkday(workday: Workday): Workday {
    workday.totalWorkday = this.getTotalWorkday(workday);
    workday.overtime = this.getOvertime(workday);
    return workday;
  }

  getTotalWorkday(workday: Workday): number {
    const records = [...((workday && workday.records) || [])];
    records.sort((recordA, recordB) =>
      compareAsc(new Date(recordA.datetime), new Date(recordB.datetime))
    );

    let totalWorkday = 0;

    for (let i = 0; i < records.length - 1; i += 2) {
      const currentEntry = records[i];
      const nextEntry = records[i + 1];

      if (nextEntry) {
        totalWorkday += differenceInMinutes(
          new Date(nextEntry.datetime),
          new Date(currentEntry.datetime)
        );
      }
    }

    return totalWorkday;
  }

  getOvertime({ totalWorkday, date }: Workday): Overtime {
    if (this.shouldCalculateValues({ totalWorkday, date } as Workday)) {
      const total = totalWorkday - this.workdayConfig.getFullWorkdayMinutes();
      const usedAs = this.getOvertimeUsedAs(date);
      return { total, usedAs } as Overtime;
    }

    return { total: 0, usedAs: null } as Overtime;
  }

  private shouldCalculateValues({ totalWorkday, date }: Workday): boolean {
    return totalWorkday > 0 || this.workdayConfig.shouldWorkAt(date);
  }

  private getOvertimeUsedAs(date: Date): OvertimeType {
    return this.workdayConfig.hasActiveCompensationContract(date)
      ? OvertimeType.COMPTIME
      : OvertimeType.OVERTIME;
  }
}
