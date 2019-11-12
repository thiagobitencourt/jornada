import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-entry-form',
  templateUrl: './time-entry-form.component.html',
  styleUrls: ['./time-entry-form.component.scss']
})
export class TimeEntryFormComponent implements OnInit {

  // public timepickerOptions: Pickadate.TimeOptions = {
  //   default: 'now',
  //   twelvehour: false,
  //   donetext: 'OK',
  //   cleartext: 'Limpar',
  //   canceltext: 'Cancelar'
  // };

  // public datepickerOptions: Pickadate.DateOptions = {
  //   clear: 'Limpar',
  //   close: 'OK',
  //   today: 'Hoje',
  //   closeOnClear: true,
  //   closeOnSelect: false,
  //   format: 'dd/mm/yyyy',
  //   formatSubmit: 'yyyy-mm-dd',
  //   selectMonths: true,
  //   selectYears: 10
  // };

  timeEntry: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.timeEntry = this.formBuilder.group({
      entryType: ['IN', Validators.required],
      date: [new Date(), Validators.required],
      time: [this.getCurrentTime(), Validators.required]
    })
  }

  saveRecord() {
    const record = this.timeEntry.getRawValue();
    // this.modalComponent.close.emit(record);
    // this.modalComponent.closeModal();
  }

  private getCurrentTime() {
    const currentTime = new Date();
    return `${currentTime.getHours()}:${currentTime.getMinutes()}`;
  }
}
