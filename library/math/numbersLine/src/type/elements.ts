import { LineRange } from "./ruler";

export enum TypeCover {
  nothing = "nothing",
  partiallyCover = "partiallyCover",
  partiallyDiscover = "partiallyDiscover",
  allCover = "allCover",
  allDiscover = "allDiscover",
  randomly = "randomly",
}

export enum ActionTypes {
  jump = "jump",
  text = "text",
  writing = "writing",
  displayNumbersLine = "displayNumbersLine",
  naviAndKani = "naviAndKani",
  reload = "reload",
}

export interface IActionIcon {
  type: ActionTypes;
  url: string;
  isDragged?: boolean;
}

export interface IDisplayRuller {
  type: string;
  visitDisable: TypeCover;
  choice: TypeCover;
}
export interface IRulerDefinition {
  type: string;
  choice: LineRange;
}
export interface IWindowSize {
  height: number;
  width: number;
}
