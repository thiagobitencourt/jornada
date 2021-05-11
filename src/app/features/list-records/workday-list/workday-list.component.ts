import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Workday } from "src/app/core/model/workday.model";
import { WorkdayRecord } from "src/app/core/model/workday-record.model";
import { MatDialog } from "@angular/material/dialog";
import { RegisterComponent } from "../../register/register.component";
import { WorkdayService } from "src/app/core/services/workday.service";
import { InputCommentComponent } from "../comment/input-comment/input-comment.component";

@Component({
  selector: "app-workday-list",
  templateUrl: "./workday-list.component.html",
  styleUrls: ["./workday-list.component.scss"],
})
export class WorkdayListComponent implements OnInit {
  @Input() workdays: Workday[] = [];
  @Output() recordChanged = new EventEmitter<Workday>();

  trackByIndex = (index) => index;

  constructor(
    public dialog: MatDialog,
    private workdayService: WorkdayService
  ) {}
  ngOnInit(): void {}

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
            this.emitRecordChanged(this.workdays[workdayIndex]);
          });
      });
  }

  removeRecord(record: WorkdayRecord, workdayIndex: number) {
    this.workdayService
      .removerWorkdayRecord(this.workdays[workdayIndex], record)
      .subscribe((newWorkday: Workday) => {
        this.workdays[workdayIndex] = newWorkday;
        this.emitRecordChanged(newWorkday);
      });
  }

  updateComment(workday: Workday) {
    this.dialog
      .open(InputCommentComponent, {
        width: "40vw",
        data: { workday, comment: workday.comment },
      })
      .afterClosed()
      .subscribe((newComment) => {
        console.log("comentário editado: " + newComment);
      });
  }

  private emitRecordChanged(workday: Workday) {
    this.recordChanged.emit(workday);
  }
}
