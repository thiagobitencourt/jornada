import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-register',
  templateUrl: './time-register.component.html',
  styleUrls: ['./time-register.component.scss']
})
export class TimeRegisterComponent implements OnInit {
  currenteDatetime: Date;
  saving = false;
  records = [];

  constructor() {
    this.initClock();
  }

  ngOnInit() {
  }

  register(datetime) {
    this.saving = true;
    setTimeout(() => {
      this.records.push(datetime);
      this.saving = false;
    }, 500);
  }

  removeRegister(recordIndex) {
    this.records.splice(recordIndex, 1);
  }

  private initClock() {
    setInterval(() => {
      this.currenteDatetime = new Date();
    }, 1000);
  }
}
