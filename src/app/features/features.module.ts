import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FeaturesRoutingModule } from './features-routing.modules';
import { SharedModule } from '../shared/shared.module';
import { ListRecordsComponent } from './list-records/list-records.component';
import { TimePickerComponent } from './register/time-picker/time-picker.component';

@NgModule({
  declarations: [ListRecordsComponent, RegisterComponent, TimePickerComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule {}
