import { Component, OnInit, Input } from '@angular/core';
import { Workday } from 'src/app/core/model/workday.model';
import * as moment from 'moment';

@Component({
  selector: 'app-workday-list',
  templateUrl: './workday-list.component.html',
  styleUrls: ['./workday-list.component.scss']
})
export class WorkdayListComponent implements OnInit {
  @Input() workdays: Workday[] = [];
  
  constructor() {}
  ngOnInit(): void {}

  getTimeFromMins(mins) {
    let curatedMins = Math.abs(mins);
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    if (curatedMins >= 24 * 60 || curatedMins < 0) {
        throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    }
    var h = curatedMins / 60 | 0,
        m = curatedMins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format("HH:mm");
  }
}
