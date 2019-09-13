import { Overtime } from './overtime.model';
import { EntryTime } from './entry-time.model';

export interface Jornada {
    date: Date;
    totalWorkDay?: string;
    overtime?: Overtime;
    entries: EntryTime[];
}