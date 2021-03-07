import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FilterPeriod, WorkdayFilter } from "src/app/core/model/workday-filter";
import { WorkdayRecord } from "src/app/core/model/workday-record.model";
import { RegisterComponent } from "../../register/register.component";

@Component({
  selector: "app-action-bar",
  templateUrl: "./action-bar.component.html",
  styleUrls: ["./action-bar.component.scss"],
})
export class ActionBarComponent implements OnInit {
  @Output() recordChanged = new EventEmitter<WorkdayRecord>();
  @Output() filterChanged = new EventEmitter<WorkdayFilter>();

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  addNewRecord() {
    this.dialog
      .open(RegisterComponent, {
        width: "40vw",
      })
      .afterClosed()
      .subscribe((workdayRecord) => {
        this.recordChanged.emit(workdayRecord);
      });
  }

  periodChanged(period: FilterPeriod) {
    this.filterChanged.emit({ period } as WorkdayFilter);
  }
}
