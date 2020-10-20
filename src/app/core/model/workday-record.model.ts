import { RecordType } from './record-type.enum';

export interface WorkdayRecord {
    id?: number;
    datetime: Date;
    recordType?: RecordType;
    message?: string;
}
