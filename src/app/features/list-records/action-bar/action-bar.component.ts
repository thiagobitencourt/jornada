import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  addNewRecord() {
    this.dialog.open(RegisterComponent, {
      width: '60vw'
    }).afterClosed().subscribe(() => {});
  }
}
