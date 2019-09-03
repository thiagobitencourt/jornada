import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecordsComponent } from './list-records.component';
import { ListRecordsRoutingModule } from './list-records-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListRecordsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListRecordsRoutingModule
  ]
})
export class ListRecordsModule { }
