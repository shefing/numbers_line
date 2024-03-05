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
  naviAndKeni = "naviAndKeni",
  restart = "restart",
}

export enum NaviKeniIconsTypes {
  navi = "Navi",
  keni = "keni",
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
export interface IIconsNaviKeni {
  type: NaviKeniIconsTypes;
  url: string;
}
export interface IWindowSize {
  height: number;
  width: number;
}
