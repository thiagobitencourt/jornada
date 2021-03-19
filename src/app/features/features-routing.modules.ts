import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListRecordsComponent } from "./list-records/list-records.component";
import { ConfigComponent } from "./config/config.component";

const routes: Routes = [
  { path: "list", component: ListRecordsComponent, pathMatch: "full" },
  { path: "config", component: ConfigComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
