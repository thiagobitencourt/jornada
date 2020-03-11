import { OvertimeType } from './overtime-type.enum';

export interface Overtime {
    usedAs: OvertimeType;
    total: number;
}
