import { Component, OnInit, Input } from "@angular/core";
import { Workday } from "src/app/core/model/workday.model";
import { WorkdayRecord } from "src/app/core/model/workday-record.model";
import { MatDialog } from "@angular/material/dialog";
import { RegisterComponent } from "../../register/register.component";
import { WorkdayService } from "src/app/core/services/workday.service";

@Component({
  selector: "app-workday-list",
  templateUrl: "./workday-list.component.html",
  styleUrls: ["./workday-list.component.scss"],
})
export class WorkdayListComponent implements OnInit {
  @Input() workdays: Workday[] = [];

  trackByIndex = (index) => index;

  constructor(
    public dialog: MatDialog,
    private workdayService: WorkdayService
  ) {}
  ngOnInit(): void {}

  getTimeFromMins(mins) {
    const curatedMins = Math.abs(mins);
    const hours = ((curatedMins / 60) | 0).toString();
    const minutes = (curatedMins % 60 | 0).toString();
    return hours.padStart(2, "0") + ":" + minutes.padStart(2, "0");
  }

  editRecord(record: WorkdayRecord, workdayIndex: number) {
    this.dialog
      .open(RegisterComponent, {
        width: "40vw",
        data: { record },
      })
      .afterClosed()
      .subscribe(() => {
        this.workdayService
          .getUpdatedWorkday(this.workdays[workdayIndex])
          .subscribe((updatedWorkday: Workday) => {
            this.workdays[workdayIndex] = {
              ...this.workdays[workdayIndex],
              ...updatedWorkday,
            };
          });
      });
  }

  removeRecord(record: WorkdayRecord, workdayIndex: number) {
    this.workdayService
      .removerWorkdayRecord(this.workdays[workdayIndex], record)
      .subscribe((newWorkday: Workday) => {
        this.workdays[workdayIndex] = newWorkday;
      });
  }
}
