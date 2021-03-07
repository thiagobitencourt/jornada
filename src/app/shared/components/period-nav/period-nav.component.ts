import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  addMonths,
  endOfMonth,
  isSameMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { FilterPeriod } from "src/app/core/model/workday-filter";

@Component({
  selector: "app-period-nav",
  templateUrl: "./period-nav.component.html",
  styleUrls: ["./period-nav.component.scss"],
})
export class PeriodNavComponent implements OnInit {
  @Output() periodChanged = new EventEmitter<FilterPeriod>();
  selectedMonth = new Date();
  isNextAllowed = false;

  constructor() {}
  ngOnInit(): void {
    setTimeout(() => this.selectedMonthChanged(), 500);
  }

  previousMonth() {
    this.selectedMonth = subMonths(this.selectedMonth, 1);
    this.selectedMonthChanged();
  }

  nextMonth() {
    if (this.isNextAllowed) {
      this.selectedMonth = addMonths(this.selectedMonth, 1);
      this.selectedMonthChanged();
    }
  }

  private selectedMonthChanged() {
    const today = new Date();
    const isCurrentMonth = isSameMonth(today, this.selectedMonth);
    this.isNextAllowed = !isCurrentMonth;
    const start = startOfMonth(this.selectedMonth);
    const end = isCurrentMonth ? today : endOfMonth(this.selectedMonth);
    this.periodChanged.emit({ start, end });
  }
}
