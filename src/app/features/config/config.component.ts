import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Config } from "src/app/core/model/config";
import { ConfigService } from "src/app/core/services/config.service";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.scss"],
})
export class ConfigComponent implements OnInit {
  configForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.loadConfig();
  }

  save() {
    this.configService
      .saveConfig(this.configForm.getRawValue() as Config)
      .subscribe();
  }

  private loadConfig() {
    this.configService.getConfig().subscribe((config) => {
      this.setConfigForm(config);
    });
  }

  private setConfigForm(config: Config) {
    this.configForm = this.formBuilder.group({
      totalDailyTime: [config.totalDailyTime, Validators.required],
    });
  }
}
