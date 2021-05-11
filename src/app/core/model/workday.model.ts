import { Overtime } from "./overtime.model";
import { WorkdayRecord } from "./workday-record.model";

export interface Workday {
  id?: number;
  date: Date;
  records: WorkdayRecord[];
  worked: boolean;
  totalWorkday?: number;
  overtime?: Overtime;
  comment?: string;
}
