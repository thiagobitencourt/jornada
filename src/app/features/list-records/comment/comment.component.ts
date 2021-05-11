import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"],
})
export class CommentComponent implements OnInit {
  @Input() comment: string;
  @Output() updateComment = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  updateCommentEvent() {
    this.updateComment.emit();
  }
}
