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

export enum WritingSituation {
  non = "",
  blue = "Blue",
  green = "Green",
  orange = "Orange",
  delete = "Delete",
}
export enum Colors {
  non = "",
  blue = "#0059DE",
  green = "#30B675",
  orange = "#F48460",
  delete = "Delete",
}

export interface IActionIcon {
  type: ActionTypes;
  url: IUrl;
  isMenu?: boolean;
  isDragged?: boolean;
}
export interface IUrl {
  url: string;
  hover: string;
  open?: string;
  disable?: string;
  blue?: string;
  green?: string;
  orange?: string;
  delete?: string;
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
  urlHover: string;
}
export interface IColor {
  description: WritingSituation;
  url: Colors;
}
export interface IWritingSituation {
  type: IColor;
  url: string;
}
export interface IWindowSize {
  height: number;
  width: number;
}
