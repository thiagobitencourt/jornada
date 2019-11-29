import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { WorkdayService } from 'src/app/shared/services/workday.service';
import { WorkdayRecord } from 'src/app/shared/model/workday-record.model';
import { RecordType } from 'src/app/shared/model/record-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  lastWorkdayRecord: WorkdayRecord;
  currenteDatetime: Date = new Date();
  saving = false;

  constructor(
    private router: Router,
    private workdayService: WorkdayService
  ) {
    this.initClock();
  }

  ngOnInit() {
    this.lastWorkdayRecord = this.workdayService.getLastRecord();
  }

  register(datetime) {
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

  private initClock() {
    setInterval(() => {
      this.currenteDatetime = new Date();
    }, 1000);
  }
}
