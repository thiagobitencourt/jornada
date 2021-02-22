import { Injectable } from "@angular/core";
import { Workday } from "../model/workday.model";
import { Overtime } from "../model/overtime.model";
import { OvertimeType } from "../model/overtime-type.enum";
import { compareAsc, differenceInMinutes } from "date-fns";

@Injectable({
  providedIn: "root",
})
export class WorkdayCalculatorService {
  fullWorkdayMinutes = 528;
  constructor() {}

  setTotalsToWorkday(workday: Workday): Workday {
    workday.totalWorkday = this.getTotalWorkday(workday);
    workday.overtime = this.getOvertime(workday.totalWorkday);
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

  getOvertime(
    totalWorkday: number,
    usedAs: OvertimeType = OvertimeType.OVERTIME
  ): Overtime {
    const overtime = {
      usedAs,
      total: totalWorkday - this.fullWorkdayMinutes,
    } as Overtime;
    return overtime;
  }
}
