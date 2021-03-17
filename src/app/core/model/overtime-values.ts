import { ColorPattern } from "./color-pattern.enum";

export interface OvertimeValueItem {
  value: number;
  label: string;
  color?: ColorPattern;
}

export interface OvertimeValues {
  overtime: OvertimeValueItem;
  undertime: OvertimeValueItem;
  comptime: OvertimeValueItem;
  comptimeBalance: OvertimeValueItem;
}
