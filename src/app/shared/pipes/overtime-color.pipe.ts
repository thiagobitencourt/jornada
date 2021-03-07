import { Pipe, PipeTransform } from "@angular/core";
import { ColorPattern } from "src/app/core/model/color-pattern.enum";

@Pipe({
  name: "overtimeColor",
})
export class OvertimeColorPipe implements PipeTransform {
  transform(overtime: number): ColorPattern {
    if (!overtime || overtime === 0) {
      return ColorPattern.DEFAULT;
    }

    return overtime > 0 ? ColorPattern.SUCCESS : ColorPattern.DANGER;
  }
}
