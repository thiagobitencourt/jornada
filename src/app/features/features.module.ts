import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecordsModule } from './list-records/list-records.module';
import { TimeRegisterComponent } from './time-register/time-register.component';
import { FeaturesRoutingModule } from './features-routing.modules';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TimeRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule,
    ListRecordsModule
  ]
})
export class FeaturesModule {}
