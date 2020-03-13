import { Component, OnInit, Input } from '@angular/core';
import { Workday } from 'src/app/core/model/workday.model';

@Component({
  selector: 'app-workday-list',
  templateUrl: './workday-list.component.html',
  styleUrls: ['./workday-list.component.scss']
})
export class WorkdayListComponent implements OnInit {
  @Input() workdays: Workday[] = [];
  
  constructor() {}
  ngOnInit(): void {}
}
