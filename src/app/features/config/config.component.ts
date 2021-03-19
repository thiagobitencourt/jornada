import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.scss"],
})
export class ConfigComponent implements OnInit {
  configForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setConfigForm();
  }

  save() {
    console.log(this.configForm.getRawValue());
  }

  private setConfigForm() {
    this.configForm = this.formBuilder.group({
      totalDailyTime: [null, Validators.required],
    });
  }
}
