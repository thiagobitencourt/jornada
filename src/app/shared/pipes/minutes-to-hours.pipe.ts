import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minutesToHours",
})
export class MinutesToHoursPipe implements PipeTransform {
  transform(mins: number, keepSignal = false): String {
    let { hours, minutes }: any = this.toHourObject(mins);
    const hoursFormat = this.format(hours) + ":" + this.format(minutes);
    return (keepSignal && mins < 0 ? "- " : "") + hoursFormat;
  }

  toHourObject(mins: number): { hours: number; minutes: number } {
    const curatedMins = Math.abs(mins);
    const hours = (curatedMins / 60) | 0;
    const minutes = curatedMins % 60 | 0;
    return { hours, minutes };
  }

  private format(value: number): string {
    return value.toString().padStart(2, "0");
  }
}
