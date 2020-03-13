import { Component, OnInit, Input } from '@angular/core';
import { WorkdayRecord } from 'src/app/core/model/workday-record.model';
import { RecordType } from 'src/app/core/model/record-type.enum';

@Component({
  selector: 'app-workday-record-list',
  templateUrl: './workday-record-list.component.html',
  styleUrls: ['./workday-record-list.component.scss']
})
export class WorkdayRecordListComponent implements OnInit {
  @Input() records: WorkdayRecord[] = [];
  RecordType = RecordType;
  
  constructor() {}
  ngOnInit(): void {}
}
