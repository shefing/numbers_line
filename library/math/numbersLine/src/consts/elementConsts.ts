import {
  IActionIcon,
  IDisplayRuller,
  IRulerDefinition,
  ActionTypes,
  TypeCover,
  NaviKeniIconsTypes,
  IIconsNaviKeni,
  WritingSituation,
  IWritingSituation,
  Colors,
} from "../type/elements";
import { LineRange } from "../type/ruler";
import jump from "/assets/icons/toolbar/jump.svg";
import text from "/assets/icons/toolbar/text.svg";
import writing from "/assets/icons/toolbar/writing.svg";
import eye from "/assets/icons/toolbar/eye.svg";
import naviAndKeni from "/assets/icons/toolbar/naviAndKeni.svg";
import restart from "/assets/icons/toolbar/restart.svg";
import navi from "/assets/icons/navi.svg";
import keni from "/assets/icons/keni.svg";
import writingDelete from "/assets/icons/writingDeleteMenu.svg";

export const actionIconsDetials: IActionIcon[] = [
  { type: ActionTypes.restart, url: restart },
  { type: ActionTypes.naviAndKeni, url: naviAndKeni, isMenu: true },
  { type: ActionTypes.displayNumbersLine, url: eye, isMenu: true },
  { type: ActionTypes.writing, url: writing, isMenu: true },
  { type: ActionTypes.text, url: text, isDragged: true },
  { type: ActionTypes.jump, url: jump, isDragged: true },
];
export const rulerDefinitionButtonDetials: IRulerDefinition[] = [
  { type: "0-10", choice: LineRange.ten },
  { type: "0-20", choice: LineRange.twenty },
  { type: "(קפיצות של 10) 0-100", choice: LineRange.hundredCircular },
  { type: "(קפיצות של 1) 0-100", choice: LineRange.hundred },
];

export const displayRulerButtonDetials: IDisplayRuller[] = [
  { type: "הסתר הכל", visitDisable: TypeCover.allCover, choice: TypeCover.allCover },
  { type: "הסתר חלקית", visitDisable: TypeCover.randomly, choice: TypeCover.randomly },
  { type: "הסתר ידנית", visitDisable: TypeCover.allCover, choice: TypeCover.partiallyCover },
  { type: "הצג ידנית", visitDisable: TypeCover.allDiscover, choice: TypeCover.partiallyDiscover },
  { type: "הצג הכל", visitDisable: TypeCover.allDiscover, choice: TypeCover.allDiscover },
];

export const iconsNaviKeni: IIconsNaviKeni[] = [
  { type: NaviKeniIconsTypes.navi, url: navi },
  { type: NaviKeniIconsTypes.keni, url: keni },
];

export const writingSituationList: IWritingSituation[] = [
  { type: { description: WritingSituation.blue, url: Colors.blue }, url: writingDelete },
  { type: { description: WritingSituation.green, url: Colors.green }, url: writingDelete },
  { type: { description: WritingSituation.orange, url: Colors.orange }, url: writingDelete },
  { type: { description: WritingSituation.delete, url: Colors.delete }, url: writingDelete },
];

export const RulerPaddingSides = 32;
export const rulerMargin = 0.15;
export const ruleHeight = 50;
export const grassHeight = 200;
export const jumpBaseHeight = 40;
export const jumpArrowHeight = 64;
export const jumpHeight = 120;
export const ToolbarHeight = 80;
export const buttonsDraggElementWidth = 30;
export const textBoxWidth = 315;
export const textBoxSize = 22;
export const maxTextBoxSize = textBoxSize * 2;
export const keniWidth = 0.6;
export const naviWidth = 0.5;
export const keniHeight = 1.05;
export const naviHeight = 0.9;
export const keniFoot = 0.5;
export const naviFoot = 0.25;
export const duplicateElementStepSpace = 30;
export const brushWidth = 15;
