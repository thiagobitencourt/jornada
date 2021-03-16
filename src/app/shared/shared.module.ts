import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialImports } from "./angular-material-imports";
import { HeaderComponent } from "./components/header/header.component";
import { MinutesToHoursPipe } from "./pipes/minutes-to-hours.pipe";
import { OverTimeDisplayComponent } from "./components/over-time-display/over-time-display.component";
import { OvertimeTypeLabelPipe } from "./pipes/overtime-type-label.pipe";
import { IsWeekendPipe } from "./pipes/is-weekend.pipe";
import { TagComponent } from "./components/tag/tag.component";
import { PeriodNavComponent } from "./components/period-nav/period-nav.component";
import { OvertimeColorPipe } from "./pipes/overtime-color.pipe";
import { StatsComponent } from "./components/stats/stats.component";

@NgModule({
  declarations: [
    HeaderComponent,
    MinutesToHoursPipe,
    OverTimeDisplayComponent,
    OvertimeTypeLabelPipe,
    IsWeekendPipe,
    OvertimeColorPipe,
    TagComponent,
    PeriodNavComponent,
    StatsComponent,
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
    OvertimeColorPipe,
    TagComponent,
    PeriodNavComponent,
    StatsComponent,
    MinutesToHoursPipe,
    OvertimeTypeLabelPipe,
    IsWeekendPipe,
  ],
})
export class SharedModule {}
