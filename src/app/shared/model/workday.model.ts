import { Overtime } from './overtime.model';
import { WorkdayRecord } from './workday-record.model';

export interface Workday {
    date: Date;
    totalWorkday?: number;
    overtime?: Overtime;
    records: WorkdayRecord[];
}
