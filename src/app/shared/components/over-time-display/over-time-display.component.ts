import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Overtime } from "src/app/core/model/overtime.model";

@Component({
  selector: "app-over-time-display",
  templateUrl: "./over-time-display.component.html",
  styleUrls: ["./over-time-display.component.scss"],
})
export class OverTimeDisplayComponent implements OnChanges {
  @Input() overtime: Overtime;
  isOvertime: boolean;
  overtimeNotZero: boolean;

  constructor() {}

  ngOnChanges(changes) {
    const { currentValue: overtime } = changes.overtime;
    if (overtime) {
      this.isOvertime = overtime.total > 0;
      this.overtimeNotZero = overtime.total !== 0;
    } else {
      this.overtimeNotZero = false;
    }
  }
}
