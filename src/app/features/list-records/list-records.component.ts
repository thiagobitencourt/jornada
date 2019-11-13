import { Component, OnInit } from '@angular/core';
import { JornadaService } from 'src/app/shared/jornada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.scss']
})
export class ListRecordsComponent implements OnInit {

  entryTimes: any[] = [];

  constructor(
    private jornadaService: JornadaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.jornadaService.listEntrytimes().subscribe(entryTimes => {
      this.entryTimes = entryTimes;
    });
  }
  
  addNewTimeRegister() {
    this.router.navigate(['time-register']);
  }
}
