import { Component, Input, OnInit } from "@angular/core";
import { ColorPattern } from "src/app/core/model/color-pattern.enum";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"],
})
export class StatsComponent implements OnInit {
  ColorPattern = ColorPattern;
  @Input() color: ColorPattern = ColorPattern.DEFAULT;
  @Input() value: number = 0;
  @Input() label: string = "";

  constructor() {}
  ngOnInit(): void {}
}
