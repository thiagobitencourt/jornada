import { Pipe, PipeTransform } from "@angular/core";
import { OvertimeType } from "src/app/core/model/overtime-type.enum";

@Pipe({
  name: "overtimeTypeLabel",
})
export class OvertimeTypeLabelPipe implements PipeTransform {
  transform(overtimeType: OvertimeType, isOvertime: boolean): unknown {
    switch (overtimeType) {
      case OvertimeType.COMPTIME:
        return "Banco de horas";
      case OvertimeType.OVERTIME:
        return isOvertime ? "Hora extra" : "Hora falta";
    }
  }
}
