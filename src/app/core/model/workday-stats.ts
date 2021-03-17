import { OvertimeValues } from "./overtime-values";
import { Workday } from "./workday.model";

export interface WorkdayStas {
  workdays: Workday[];
  statsValue: OvertimeValues;
}
