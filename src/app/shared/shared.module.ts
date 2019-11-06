import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSliderModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class SharedModule { }
