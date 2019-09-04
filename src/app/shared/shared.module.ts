import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    FormsModule,
    ReactiveFormsModule,
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
    FormsModule,
    ReactiveFormsModule,
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
