import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MzIconModule,
  MzIconMdiModule,
  MzButtonModule,
  MzTimepickerModule,
  MzCollectionModule,
  MzModalModule,
  MzInputModule,
  MzDatepickerModule
} from 'ngx-materialize'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzTimepickerModule,
    MzCollectionModule,
    MzModalModule,
    MzInputModule,
    MzDatepickerModule
  ],
  exports: [
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzTimepickerModule,
    MzCollectionModule,
    MzModalModule,
    MzInputModule,
    MzDatepickerModule
  ]
})
export class SharedModule { }
