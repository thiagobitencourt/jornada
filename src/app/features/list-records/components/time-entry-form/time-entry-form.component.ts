import { Component } from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';

@Component({
  selector: 'app-time-entry-form',
  templateUrl: './time-entry-form.component.html',
  styleUrls: ['./time-entry-form.component.scss']
})
export class TimeEntryFormComponent extends MzBaseModal {

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

  constructor() {
    super();
  }

  saveRecord() {
    this.modalComponent.close.emit({ works: true } as any);
    this.modalComponent.closeModal();
  }
}
