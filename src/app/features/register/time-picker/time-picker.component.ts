import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Input() currentDatetime: Date;
  @Output() updateValue = new EventEmitter();

  hours: number[] = [];
  minutes: number[] = [];

  selectedHour: FormControl;
  selectedMinute: FormControl;
  
  constructor() {}
  
  ngOnInit(): void {
    this.setHoursList();
    this.setMinutesList();
    this.setCurrentDatetime(this.currentDatetime);
  }

  save() {
    const hour = this.selectedHour.value;
    const minute = this.selectedMinute.value;
    this.updateValue.emit({ hour, minute });
  }

  cancel() {
    this.updateValue.emit();
  }

  private setCurrentDatetime(datetime) {
    if (datetime) {
      this.selectedHour = new FormControl(this.currentDatetime.getHours());
      this.selectedMinute = new FormControl(this.currentDatetime.getMinutes());
    } else {
      this.selectedHour = new FormControl(new Date().getHours());
      this.selectedMinute = new FormControl(new Date().getMinutes());
    }
  }

  private setHoursList() {
    this.hours = this.getNumberList(23);
  }

  private setMinutesList() {
    this.minutes = this.getNumberList(59);
  }

  private getNumberList(maxValue) {
    const list = [];
    for(let i = 0; i <= maxValue; i++) {
      list.push(i);
    }
    return list;
  }
}
