import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeRegisterComponent } from './time-register/time-register.component';

const routes: Routes = [
  { path: 'time-register', component: TimeRegisterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
