import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialImports } from "./angular-material-imports";
import { HeaderComponent } from "./components/header/header.component";
import { MinutesToHoursPipe } from "./pipes/minutes-to-hours.pipe";
import { OverTimeDisplayComponent } from "./components/over-time-display/over-time-display.component";
import { OvertimeTypeLabelPipe } from "./pipes/overtime-type-label.pipe";
import { IsWeekendPipe } from "./pipes/is-weekend.pipe";

@NgModule({
  declarations: [
    HeaderComponent,
    MinutesToHoursPipe,
    OverTimeDisplayComponent,
    OvertimeTypeLabelPipe,
    IsWeekendPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImports,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImports,
    HeaderComponent,
    OverTimeDisplayComponent,
    MinutesToHoursPipe,
    OvertimeTypeLabelPipe,
    IsWeekendPipe,
  ],
})
export class SharedModule {}
