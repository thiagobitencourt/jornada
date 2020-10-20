import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}

  generateId(): number {
    return Date.now();
  }

  getNumberList(maxValue) {
    const list = [];
    for(let i = 0; i <= maxValue; i++) {
      list.push(i);
    }
    return list;
  }
}
