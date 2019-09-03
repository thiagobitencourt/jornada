import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MzIconModule,
  MzIconMdiModule,
  MzButtonModule,
  MzTimepickerModule,
  MzCollectionModule
} from 'ngx-materialize'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzTimepickerModule,
    MzCollectionModule
  ],
  exports: [
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzTimepickerModule,
    MzCollectionModule
  ]
})
export class SharedModule { }
