import { Component, OnInit, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecordType } from 'src/app/core/model/record-type.enum';
import { WorkdayRecord } from 'src/app/core/model/workday-record.model';
import { WorkdayService } from 'src/app/core/services/workday.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RecordType = RecordType;
  lastWorkdayRecord: WorkdayRecord;
  isCustomDatetime = false;
  todaySelected = true;
  saving = false;
  changingTime = false;

  timeRecordForm: FormGroup;
  datetimeControl: AbstractControl;
  recordTypeControl: AbstractControl;
  interval: any;
  editingRecord: WorkdayRecord;

  constructor(
    private formBuilder: FormBuilder,
    private workdayService: WorkdayService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editingRecord = data && data.record;
    if (!this.editingRecord) {
      this.initClock();
    }
  }

  ngOnInit() {
    this.timeRecordForm = this.formBuilder.group({
      datetime: [this.editingRecord ? this.editingRecord.datetime : new Date()],
      recordType: [this.editingRecord ? this.editingRecord.recordType : RecordType.IN],
      message: [this.editingRecord ? this.editingRecord.message : null]
    });

    this.datetimeControl = this.timeRecordForm.controls.datetime;
    this.recordTypeControl = this.timeRecordForm.controls.recordType;
    this.lastWorkdayRecord = this.workdayService.getLastRecord();
    this.recordTypeControl.setValue(this.lastWorkdayRecord.recordType === RecordType.IN ? RecordType.OUT : RecordType.IN);
    this.datetimeControl.valueChanges.subscribe(() => {
      this.checkForTodaySelection();
    });
  }

  register() {
    this.saving = true;
    const record: WorkdayRecord = this.timeRecordForm.getRawValue();
    const serviceAction = !!this.editingRecord
      ? this.workdayService.editWorkdayRecord(record)
      : this.workdayService.addWorkdayRecord(record);
    
    serviceAction.pipe(finalize(() => {
       this.saving = false;
      }))
      .subscribe(() => {
        this.closeDialog();
      });
  }

  customDatetimeSelected() {
    this.stopClock();
    this.setTimeToSelectedDatetime();
  }

  recordTypeChanged({ value }) {
    this.recordTypeControl.setValue(value);
  }

  setTimeValue(time) {
    this.changingTime = false;

    if (time) {
      this.stopClock();
      const { hour, minute } = time;
      const currentDatetime = new Date(this.datetimeControl.value);
      currentDatetime.setHours(hour);
      currentDatetime.setMinutes(minute);
      currentDatetime.setSeconds(0);
      this.datetimeControl.setValue(currentDatetime);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  setYesterday() {
    this.stopClock();
    const currentValue = new Date(this.datetimeControl.value);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(currentValue.getHours());
    yesterday.setMinutes(currentValue.getMinutes());
    yesterday.setSeconds(0);
    this.datetimeControl.setValue(yesterday);
  }

  setToday() {
    const currentValue = new Date(this.datetimeControl.value);
    const today = new Date();
    today.setHours(currentValue.getHours());
    today.setMinutes(currentValue.getMinutes());
    today.setSeconds(0);
    this.datetimeControl.setValue(today);
  }

  private checkForTodaySelection() {
    const currentDatetime = new Date(this.datetimeControl.value);
    const todayDatetime = new Date();
    this.todaySelected = (
      currentDatetime.getDate() === todayDatetime.getDate() &&
      currentDatetime.getMonth() === todayDatetime.getMonth() &&
      currentDatetime.getFullYear() === todayDatetime.getFullYear()
    )
  }

  private setTimeToSelectedDatetime() {
    const currentDatetime = new Date(this.datetimeControl.value);
    if (currentDatetime.getHours() == 0 && currentDatetime.getMinutes() == 0) {
      const rightNow = new Date();
      currentDatetime.setHours(rightNow.getHours());
      currentDatetime.setMinutes(rightNow.getMinutes());
      this.datetimeControl.setValue(currentDatetime);
    }
  }

  private initClock() {
    this.interval = setInterval(() => {
      this.datetimeControl.setValue(new Date());
    }, 1000);
  }

  private stopClock() {
    this.isCustomDatetime = true;
    clearInterval(this.interval);
  }
}
