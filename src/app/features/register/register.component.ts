import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkdayRecord } from 'src/app/core/model/workday-record.model';
import { WorkdayService } from 'src/app/core/services/workday.service';
import { getHours, getMinutes, setHours, setMinutes, setSeconds } from 'date-fns';
import { UtilService } from 'src/app/core/services/util.service';

export interface WorkdayFormRecord extends WorkdayRecord {
  hour: number,
  minute: number
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  readonly today = new Date();
  saving = false;
  timeRecordForm: FormGroup;
  editingRecord: WorkdayRecord;
  hours: number[] = [];
  minutes: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private workdayService: WorkdayService,
    private utilService: UtilService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editingRecord = (data && data.record) || {};
    this.setHoursMinutesList();
  }

  ngOnInit() {
    const initialRecord = this.getInitialValues();
    this.timeRecordForm = this.formBuilder.group({
      id: [initialRecord.id],
      datetime: [initialRecord.datetime, Validators.required],
      hour: [getHours(initialRecord.datetime), Validators.required],
      minute: [getMinutes(initialRecord.datetime), Validators.required],
      message: [initialRecord.message]
    });
  }

  saveRecord() {
    this.saving = true;
    this.workdayService.saveWorkdayRecord(this.getRecordReady())
      .subscribe(() => this.closeDialog())
      .add(() => (this.saving = false));
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getInitialValues(): WorkdayFormRecord {
    const datetime = this.editingRecord && this.editingRecord.datetime ? new Date(this.editingRecord.datetime) : this.today;
    return {
      ...this.editingRecord,
      datetime,
      hour: getHours(datetime),
      minute: getMinutes(datetime)
    };
  }

  private getRecordReady(): WorkdayRecord {
    const record: WorkdayFormRecord  = this.timeRecordForm.getRawValue();

    record.datetime = setHours(record.datetime, record.hour);
    record.datetime = setMinutes(record.datetime, record.minute);
    record.datetime = setSeconds(record.datetime, 0);

    delete record.hour;
    delete record.minute;

    return record as WorkdayRecord;
  }

  private setHoursMinutesList() {
    this.hours = this.utilService.getNumberList(23);
    this.minutes = this.utilService.getNumberList(59);
  }
}
