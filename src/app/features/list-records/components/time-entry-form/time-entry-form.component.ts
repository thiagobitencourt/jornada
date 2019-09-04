import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-entry-form',
  templateUrl: './time-entry-form.component.html',
  styleUrls: ['./time-entry-form.component.scss']
})
export class TimeEntryFormComponent extends MzBaseModal implements OnInit {

  public timepickerOptions: Pickadate.TimeOptions = {
    default: 'now',
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'Limpar',
    canceltext: 'Cancelar'
  };

  public datepickerOptions: Pickadate.DateOptions = {
    clear: 'Limpar',
    close: 'OK',
    today: 'Hoje',
    closeOnClear: true,
    closeOnSelect: false,
    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy-mm-dd',
    selectMonths: true,
    selectYears: 10
  };

  timeEntry: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.timeEntry = this.formBuilder.group({
      date: [ new Date(), Validators.required ],
      time: [ this.getCurrentTime(), Validators.required ],
      description: []
    })
  }

  saveRecord() {
    const record = this.timeEntry.getRawValue();
    this.modalComponent.close.emit({ record } as any);
    this.modalComponent.closeModal();
  }

  private getCurrentTime() {
    const currentTime = new Date();
    return `${currentTime.getHours()}:${currentTime.getMinutes()}`;
  }
}
