import { Component, OnDestroy, OnInit } from "@angular/core";
import { Workday } from "src/app/core/model/workday.model";
import { WorkdayService } from "src/app/core/services/workday.service";
import { Subscription } from "rxjs";
import { WorkdayFilter } from "src/app/core/model/workday-filter";
import { OvertimeValues } from "src/app/core/model/overtime-values";
import { WorkdayStas } from "src/app/core/model/workday-stats";

@Component({
  selector: "app-list-records",
  templateUrl: "./list-records.component.html",
  styleUrls: ["./list-records.component.scss"],
})
export class ListRecordsComponent implements OnInit, OnDestroy {
  loadingWorkdaysSubscription: Subscription;
  workdays: Workday[];
  statsValue: OvertimeValues;
  filter: WorkdayFilter;

  constructor(private workdayService: WorkdayService) {}
  ngOnInit() {}

  ngOnDestroy() {
    this.cancelCurrentRequest();
  }

  loadWorkdays(filters?: WorkdayFilter) {
    this.updateFilters(filters);
    this.cancelCurrentRequest();
    this.loadingWorkdaysSubscription = this.workdayService
      .listWorkdays(this.filter)
      .subscribe(({ workdays, statsValue }: WorkdayStas) => {
        this.workdays = workdays || [];
        this.statsValue = statsValue;
      });
  }

  private updateFilters(filters: WorkdayFilter) {
    this.filter = { ...this.filter, ...filters };
  }

  private cancelCurrentRequest() {
    if (this.loadingWorkdaysSubscription) {
      this.loadingWorkdaysSubscription.unsubscribe();
    }
  }
}
