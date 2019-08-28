import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecordsComponent } from './list-records.component';
import { ListRecordsRoutingModule } from './list-records-routing.module';

@NgModule({
  declarations: [ListRecordsComponent],
  imports: [
    CommonModule,
    ListRecordsRoutingModule
  ]
})
export class ListRecordsModule { }
