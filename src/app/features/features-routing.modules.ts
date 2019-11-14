import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListRecordsComponent } from './list-records/list-records.component';

const routes: Routes = [
  { path: 'list', component: ListRecordsComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
