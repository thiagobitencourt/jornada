import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Jornada } from './model/jornada.model';
import { OvertimeType } from './model/overtime-type.enum';
import { EntryTimeType } from './model/entry-time-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ListRecordsService {

  recordList: Jornada[] = [
    {
      date: new Date('2019-09-09'),
      totalWorkDay: '8:42',
      overtime: {
        total: '1:00',
        usedAs: OvertimeType.OVERTIME
      },
      entries: [
        {
          time: '07:30',
          entryType: EntryTimeType.IN
        },
        {
          time: '17:30',
          entryType: EntryTimeType.OUT
        }
      ]
    }
  ];

  constructor() { }

  loadRecords() {
    return of(this.recordList);
  }
}
