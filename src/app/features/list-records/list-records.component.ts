import { Component, OnDestroy, OnInit } from '@angular/core';
import { Workday } from 'src/app/core/model/workday.model';
import { WorkdayService } from 'src/app/core/services/workday.service';
import { Subscription } from 'rxjs';
import { WorkdayFilter } from 'src/app/core/model/workday-filter';
import { startOfMonth } from 'date-fns';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.scss']
})
export class ListRecordsComponent implements OnInit, OnDestroy {
  loadingWorkdaysSubscription: Subscription;
  workdays: Workday[];
  filter: WorkdayFilter;

  constructor(private workdayService: WorkdayService) {}
  ngOnInit() {
    this.setInitialFilter();
    this.loadWorkdays();
  }

  ngOnDestroy() {
    this.cancelCurrentRequest();
  }

  loadWorkdays() {
    this.cancelCurrentRequest();
    this.loadingWorkdaysSubscription = this.workdayService.listWorkdays(this.filter).subscribe(workdays => {
      this.workdays = workdays || [];
    });
  }

  private setInitialFilter() {
    const today = new Date();
    this.filter = { start: startOfMonth(today), end: today };
  }

  private cancelCurrentRequest() {
    if (this.loadingWorkdaysSubscription) {
      this.loadingWorkdaysSubscription.unsubscribe();
    }
  }
}
