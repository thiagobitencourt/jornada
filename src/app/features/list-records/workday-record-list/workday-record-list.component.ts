import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WorkdayRecord } from 'src/app/core/model/workday-record.model';

@Component({
  selector: 'app-workday-record-list',
  templateUrl: './workday-record-list.component.html',
  styleUrls: ['./workday-record-list.component.scss']
})
export class WorkdayRecordListComponent implements OnInit {
  @Input() records: WorkdayRecord[] = [];
  @Output() editRecord = new EventEmitter<WorkdayRecord>();
  @Output() removeRecord = new EventEmitter<WorkdayRecord>();
  
  constructor() {}
  ngOnInit(): void {}

  editWorkdayRecord(record: WorkdayRecord) {
    this.editRecord.emit(record);
  }

  removeWorkdayRecord(record: WorkdayRecord) {
    this.removeRecord.emit(record);
  }
}
