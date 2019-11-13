import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  entryTimes = [];
  constructor() { }

  addEntrytime(entryTime) {
    this.entryTimes.push(entryTime);
    return of({});
  }

  listEntrytimes() {
    return of(this.entryTimes);
  }
}
