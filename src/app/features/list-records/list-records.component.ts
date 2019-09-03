import { Component, OnInit } from '@angular/core';
import { MzModalService } from 'ngx-materialize';
import { TimeEntryFormComponent } from './components/time-entry-form/time-entry-form.component';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.scss']
})
export class ListRecordsComponent implements OnInit {

  constructor(private modalService: MzModalService) { }

  ngOnInit() {
  }

  createNewRecord() {
    const { instance } = this.modalService.open(TimeEntryFormComponent, {});
    instance.modalComponent.close.subscribe(result => {
      console.log(result);
    });
  }
}
