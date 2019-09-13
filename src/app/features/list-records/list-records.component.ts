import { Component, OnInit } from '@angular/core';
import { MzModalService } from 'ngx-materialize';
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
    private modalService: MzModalService,
    private listRecordsService: ListRecordsService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  createNewRecord() {
    const { instance } = this.modalService.open(TimeEntryFormComponent, {});
    instance.modalComponent.close.subscribe(result => {
      console.log(result);
    });
  }

  loadRecords() {
    this.listRecordsService.loadRecords().subscribe(records => {
      this.entryTimes = records;
    });
  }
}
