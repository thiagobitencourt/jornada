import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRecordsComponent } from './list-records.component';

const routes: Routes = [
  { path: 'list', component: ListRecordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ListRecordsRoutingModule { }
