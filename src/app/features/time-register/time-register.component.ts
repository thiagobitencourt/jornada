import { Component, OnInit } from '@angular/core';
import { JornadaService } from 'src/app/shared/jornada.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-time-register',
  templateUrl: './time-register.component.html',
  styleUrls: ['./time-register.component.scss']
})
export class TimeRegisterComponent implements OnInit {
  currenteDatetime: Date = new Date();
  saving = false;
  records = [];

  constructor(
    private router: Router,
    private jornadaService: JornadaService
  ) {
    this.initClock();
  }

  ngOnInit() {
  }

  register(datetime) {
    this.saving = true;
    this.jornadaService
      .addEntrytime(datetime)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(() => {
        this.router.navigate(['list']);
      });
  }

  removeRegister(recordIndex) {
    this.records.splice(recordIndex, 1);
  }

  private initClock() {
    setInterval(() => {
      this.currenteDatetime = new Date();
    }, 1000);
  }
}
