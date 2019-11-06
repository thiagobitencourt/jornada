import { Component, OnInit } from '@angular/core';
import { TimeEntryFormComponent } from './components/time-entry-form/time-entry-form.component';
import { Jornada } from './model/jornada.model';
import { ListRecordsService } from './list-records.service';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.scss']
})
export class ListRecordsComponent implements OnInit {

  entryTimes: Jornada[];

  constructor(
    private listRecordsService: ListRecordsService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  createNewRecord() {
    // const { instance } = this.modalService.open(TimeEntryFormComponent, {});
    // instance.modalComponent.close.subscribe(result => {
    //   if (result) {
    //     this.addEntryTime(result);
    //   }
    // });
  }

  loadRecords() {
    this.listRecordsService.loadRecords().subscribe(records => {
      this.entryTimes = records;
    });
  }

  private addEntryTime(entryTimeRecord) {
    const { date, entryType, time } = entryTimeRecord;
    const jornadaDay = this.entryTimes.find(record => record.date.toISOString() === date.toISOString());
    if (jornadaDay) {
      jornadaDay.entries.push({ entryType, time });
    } else {
      this.entryTimes.push({ date, entries: [{ entryType, time }] });
    }
  }
}
