import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialImports } from "./angular-material-imports";
import { HeaderComponent } from "./components/header/header.component";
import { MinutesToHoursPipe } from "./pipes/minutes-to-hours.pipe";

@NgModule({
  declarations: [HeaderComponent, MinutesToHoursPipe],
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
    MinutesToHoursPipe,
  ],
})
export class SharedModule {}
