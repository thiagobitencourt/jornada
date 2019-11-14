import { RecordType } from './record-type.enum';

export interface WorkdayRecord {
    datetime: Date,
    recordType: RecordType
}
