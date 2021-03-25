import { CompensationTimeContract } from "./compensation-time-contract";
import { Holiday } from "./holiday";

export interface Config {
  totalDailyTime: number;
  workingDays: number[];
  holyDays: Holiday;
  compensationTimeContract: CompensationTimeContract;
}
