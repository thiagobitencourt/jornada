import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkdayService } from 'src/app/shared/services/workday.service';
import { Workday } from 'src/app/shared/model/workday.model';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.scss']
})
export class ListRecordsComponent implements OnInit {
  workdays: Workday[] = [];

  constructor(
    private workdayService: WorkdayService,
    private router: Router
  ) { }

  ngOnInit() {
    this.workdayService.listWorkdays()
      .subscribe((workdays: Workday[]) => {
        this.workdays = workdays;
      });
  }
  
  addNewRecord() {
    this.router.navigate(['register']);
  }
}
