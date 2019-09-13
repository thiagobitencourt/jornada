import { EntryTimeType } from './entry-time-type.enum';

export interface EntryTime {
    entryType: EntryTimeType;
    time: string;
}