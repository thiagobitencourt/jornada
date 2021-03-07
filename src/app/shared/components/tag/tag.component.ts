import { Component, Input, OnInit } from "@angular/core";
import { ColorPattern } from "src/app/core/model/color-pattern.enum";

@Component({
  selector: "app-tag",
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.scss"],
})
export class TagComponent implements OnInit {
  @Input() color: ColorPattern = ColorPattern.DEFAULT;
  constructor() {}
  ngOnInit(): void {}
}
