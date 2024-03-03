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
  restart = "restart",
}

export enum IconsNaviKaniTypes {
  navi = "Navi",
  kani = "kani",
}

export interface IActionIcon {
  type: ActionTypes;
  url: string;
  isMenu?: boolean;
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
export interface IIconsNaviKani {
  type: IconsNaviKaniTypes;
  url: string;
}
export interface IWindowSize {
  height: number;
  width: number;
}
