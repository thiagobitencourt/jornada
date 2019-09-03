import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecordsComponent } from './list-records.component';
import { ListRecordsRoutingModule } from './list-records-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeEntryFormComponent } from './components/time-entry-form/time-entry-form.component';

@NgModule({
  declarations: [ListRecordsComponent, TimeEntryFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListRecordsRoutingModule
  ],
  entryComponents: [TimeEntryFormComponent]
})
export class ListRecordsModule { }
