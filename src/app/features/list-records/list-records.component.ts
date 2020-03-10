import { Component, OnInit } from '@angular/core';
import { WorkdayService } from 'src/app/shared/services/workday.service';
import { Workday } from 'src/app/shared/model/workday.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { RecordType } from 'src/app/shared/model/record-type.enum';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.scss']
})
export class ListRecordsComponent implements OnInit {
  RecordType = RecordType;
  workdays: Workday[] = [];

  constructor(
    private workdayService: WorkdayService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.workdayService.listWorkdays()
      .subscribe((workdays: Workday[]) => {
        this.workdays = workdays;
      });
  }
  
  addNewRecord() {
    this.dialog.open(RegisterComponent, {
      width: '60vw'
    }).afterClosed().subscribe(() => {});
  }
}
