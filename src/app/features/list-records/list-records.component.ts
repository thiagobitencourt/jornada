import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { RecordType } from 'src/app/core/model/record-type.enum';
import { Workday } from 'src/app/core/model/workday.model';
import { WorkdayService } from 'src/app/core/services/workday.service';

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
