import { Component, OnInit } from '@angular/core';
import { Workday } from 'src/app/core/model/workday.model';
import { WorkdayService } from 'src/app/core/services/workday.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.scss']
})
export class ListRecordsComponent implements OnInit {
  workdays: Observable<Workday[]>;

  constructor(private workdayService: WorkdayService) {}
  ngOnInit() {
    this.workdays = this.workdayService.listWorkdays();
  }
}
