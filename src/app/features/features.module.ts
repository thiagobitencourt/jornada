import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FeaturesRoutingModule } from './features-routing.modules';
import { SharedModule } from '../shared/shared.module';
import { ListRecordsComponent } from './list-records/list-records.component';

@NgModule({
  declarations: [ListRecordsComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule {}
