import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register/register.component";
import { FeaturesRoutingModule } from "./features-routing.modules";
import { SharedModule } from "../shared/shared.module";
import { ListRecordsComponent } from "./list-records/list-records.component";
import { ActionBarComponent } from "./list-records/action-bar/action-bar.component";
import { WorkdayListComponent } from "./list-records/workday-list/workday-list.component";
import { WorkdayRecordListComponent } from "./list-records/workday-record-list/workday-record-list.component";
import { OvertimeStatsComponent } from "./list-records/overtime-stats/overtime-stats.component";
import { ConfigComponent } from "./config/config.component";
import { CommentComponent } from "./list-records/comment/comment.component";
import { InputCommentComponent } from "./list-records/comment/input-comment/input-comment.component";

@NgModule({
  declarations: [
    ListRecordsComponent,
    RegisterComponent,
    ActionBarComponent,
    WorkdayListComponent,
    WorkdayRecordListComponent,
    OvertimeStatsComponent,
    ConfigComponent,
    CommentComponent,
    InputCommentComponent,
  ],
  imports: [CommonModule, SharedModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
