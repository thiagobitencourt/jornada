import { Injectable } from "@angular/core";
import {
  setDate,
  isWithinInterval,
  endOfDay,
  startOfMonth,
  getDay,
} from "date-fns";

@Injectable({
  providedIn: "root",
})
export class WorkdayConfigService {
  private fullWorkdayMinutes = 528; // 08:48
  private compensationContractStart = startOfMonth(new Date());
  private compensationContractEnd = endOfDay(setDate(new Date(), 20));
  private workingDays = [1, 2, 3, 4, 5]; // segunda a sexta

  constructor() {}

  getFullWorkdayMinutes(): number {
    return this.fullWorkdayMinutes;
  }

  // Contrato de banco de horas ativo
  hasActiveCompensationContract(date: Date): boolean {
    return isWithinInterval(date, {
      start: this.compensationContractStart,
      end: this.compensationContractEnd,
    });
  }

  shouldWorkAt(date: Date): boolean {
    return this.workingDays.includes(getDay(date)) && !this.isHolyday(date);
  }

  private isHolyday(date: Date): boolean {
    // TODO: implement
    return false;
  }
}
