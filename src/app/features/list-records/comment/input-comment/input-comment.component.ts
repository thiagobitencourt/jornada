import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WorkdayService } from "src/app/core/services/workday.service";

@Component({
  selector: "app-input-comment",
  templateUrl: "./input-comment.component.html",
  styleUrls: ["./input-comment.component.scss"],
})
export class InputCommentComponent implements OnInit {
  saving = false;
  commentControl: FormControl;

  constructor(
    private workdayService: WorkdayService,
    public dialogRef: MatDialogRef<InputCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.commentControl = new FormControl(data.comment);
  }

  ngOnInit(): void {}

  saveComment() {
    if (!this.saving) {
      this.saving = true;
      this.workdayService
        .saveWorkdayComment(this.data.workday, this.commentControl.value)
        .subscribe(() => this.closeDialog())
        .add(() => (this.saving = false));
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
