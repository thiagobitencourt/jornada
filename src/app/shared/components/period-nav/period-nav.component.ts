import { Component, OnInit } from "@angular/core";
import { addMonths, isSameMonth, subMonths } from "date-fns";

@Component({
  selector: "app-period-nav",
  templateUrl: "./period-nav.component.html",
  styleUrls: ["./period-nav.component.scss"],
})
export class PeriodNavComponent implements OnInit {
  selectedMonth = new Date();
  isNextAllowed = false;

  constructor() {}
  ngOnInit(): void {}

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
    this.isNextAllowed = !isSameMonth(new Date(), this.selectedMonth);
    // emit change event
  }
}
