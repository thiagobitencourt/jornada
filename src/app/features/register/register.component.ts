import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { WorkdayService } from 'src/app/shared/services/workday.service';
import { WorkdayRecord } from 'src/app/shared/model/workday-record.model';
import { RecordType } from 'src/app/shared/model/record-type.enum';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  timeRecordForm: FormGroup;
  datetimeControl: AbstractControl;
  recordTypeControl: AbstractControl;
  interval: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private workdayService: WorkdayService
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
        this.router.navigate(['list']);
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
