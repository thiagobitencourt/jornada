import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Input() currenteDatetime: Date;
  @Output() updateValue = new EventEmitter();

  hours: number[] = [];
  minutes: number[] = [];

  selectedHour: FormControl;
  selectedMinute: FormControl;
  
  constructor() {
    if (this.currenteDatetime) {
      this.selectedHour = new FormControl(this.currenteDatetime.getHours());
      this.selectedMinute = new FormControl(this.currenteDatetime.getMinutes());
    } else {
      this.selectedHour = new FormControl(new Date().getHours());
      this.selectedMinute = new FormControl(new Date().getMinutes());
    }
  }
  
  ngOnInit(): void {
    this.setHoursList();
    this.setMinutesList();
  }

  save() {
    const hour = this.selectedHour.value;
    const minute = this.selectedMinute.value;
    this.updateValue.emit({ hour, minute });
  }

  cancel() {
    this.updateValue.emit();
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
