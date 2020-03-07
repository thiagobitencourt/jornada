import { Component, OnInit, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { WorkdayService } from 'src/app/shared/services/workday.service';
import { WorkdayRecord } from 'src/app/shared/model/workday-record.model';
import { RecordType } from 'src/app/shared/model/record-type.enum';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RecordType = RecordType;
  lastWorkdayRecord: WorkdayRecord;
  currenteDatetime: Date = new Date();
  isCustomDatetime = false;
  todaySelected = true;
  saving = false;
  changingTime = false;

  timeRecordForm: FormGroup;
  datetimeControl: AbstractControl;
  recordTypeControl: AbstractControl;
  interval: any;

  constructor(
    private formBuilder: FormBuilder,
    private workdayService: WorkdayService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initClock();
  }

  ngOnInit() {
    this.timeRecordForm = this.formBuilder.group({
      datetime: [null, Validators.required],
      recordType: [RecordType.IN],
      message: [null]
    });

    this.datetimeControl = this.timeRecordForm.controls.datetime;
    this.recordTypeControl = this.timeRecordForm.controls.recordType;
    this.lastWorkdayRecord = this.workdayService.getLastRecord();
    this.recordTypeControl.setValue(this.lastWorkdayRecord.recordType === RecordType.IN ? RecordType.OUT : RecordType.IN); 
  }

  register() {
    const datetime = this.timeRecordForm.get('datetime').value;
    this.saving = true;
    const recordType = this.lastWorkdayRecord.recordType === RecordType.IN
      ? RecordType.OUT
      : RecordType.IN; 
    this.workdayService
      .addWorkdayRecord(
        {
          datetime,
          recordType
        } as WorkdayRecord
      )
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(() => {
        this.closeDialog();
      });
  }

  customDatetimeSelected() {
    clearInterval(this.interval);
    this.isCustomDatetime = true;
    this.setTimeToSelectedDatetime();
    this.todaySelected = this.isTodaySelected();
  }

  recordTypeChanged({ value }) {
    this.recordTypeControl.setValue(value);
  }

  setTimeValue(time) {
    this.changingTime = false;

    if (time) {
      const { hour, minute } = time;
      clearInterval(this.interval);
      this.isCustomDatetime = true;
  
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

  private isTodaySelected() {
    const currentDatetime = new Date(this.datetimeControl.value);
    const todayDatetime = new Date();
    return (
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
}
