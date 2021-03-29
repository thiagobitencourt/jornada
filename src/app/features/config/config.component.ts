import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Config } from "src/app/core/model/config";
import { ConfigService } from "src/app/core/services/config.service";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.scss"],
})
export class ConfigComponent implements OnInit {
  configForm: FormGroup;
  workingDayList = [
    { label: "Domingo", value: 0, selected: false },
    { label: "Segunda-feira", value: 0, selected: true },
    { label: "Terça-feira", value: 0, selected: true },
    { label: "Quarta-feira", value: 0, selected: true },
    { label: "Quinta-feira", value: 0, selected: true },
    { label: "Sexta-feira", value: 6, selected: true },
    { label: "Sábado", value: 7, selected: false },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.loadConfig();
  }

  save() {
    const config: Config = this.configForm.getRawValue();
    this.configService.saveConfig(config).subscribe();
  }

  get daysList(): FormArray {
    return this.configForm.controls.workingDays as FormArray;
  }

  private loadConfig() {
    this.configService.getConfig().subscribe((config) => {
      this.setConfigForm(config);
    });
  }

  private setConfigForm(config: Config) {
    this.configForm = this.formBuilder.group({
      totalDailyTime: [config.totalDailyTime, Validators.required],
      workingDays: new FormArray([]),
    });

    this.addWeekDays();
  }

  private addWeekDays() {
    this.workingDayList.forEach((day) =>
      this.daysList.push(new FormControl(day.selected))
    );
  }
}
