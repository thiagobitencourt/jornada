import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MzIconModule,
  MzIconMdiModule,
  MzButtonModule,
  MzTimepickerModule,
  MzModalModule,
  MzInputModule,
  MzDatepickerModule,
  MzCollapsibleModule
} from 'ngx-materialize';

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
    MzModalModule,
    MzInputModule,
    MzDatepickerModule,
    MzCollapsibleModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzTimepickerModule,
    MzModalModule,
    MzInputModule,
    MzDatepickerModule,
    MzCollapsibleModule
  ]
})
export class SharedModule { }
