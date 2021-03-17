import { Component, Input, OnInit } from "@angular/core";
import { OvertimeValues } from "src/app/core/model/overtime-values";

@Component({
  selector: "app-overtime-stats",
  templateUrl: "./overtime-stats.component.html",
  styleUrls: ["./overtime-stats.component.scss"],
})
export class OvertimeStatsComponent implements OnInit {
  @Input() statsValue: OvertimeValues;

  constructor() {}
  ngOnInit(): void {}
}
