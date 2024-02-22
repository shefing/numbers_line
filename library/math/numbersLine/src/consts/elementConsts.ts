import { IActionIcon, IDisplayRuller, IRulerDefinition, TypeActionIconsToolbar, TypeCover } from "../type/elements";
import jump from "/assets/icons/toolbar/jump.svg";
import text from "/assets/icons/toolbar/text.svg";
import writing from "/assets/icons/toolbar/writing.svg";
import eye from "/assets/icons/toolbar/eye.svg";
import naviAndKani from "/assets/icons/toolbar/naviAndKani.svg";
import reload from "/assets/icons/toolbar/reload.svg";
import { LineRange } from "@/type/ruler";

export const actionIconsDetials: IActionIcon[] = [
  { type: TypeActionIconsToolbar.naviAndKani, url: naviAndKani },
  { type: TypeActionIconsToolbar.displayNumbersLine, url: eye },
  { type: TypeActionIconsToolbar.reload, url: reload },
  { type: TypeActionIconsToolbar.writing, url: writing },
  { type: TypeActionIconsToolbar.text, url: text },
  { type: TypeActionIconsToolbar.jump, url: jump },
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

export const RulerPaddingSides = 32;
export const RulerPadding = 50;
export const RulerMargin = window.innerHeight * 0.25;
export const jumpBaseHeight = 40;
export const jumpArrowHeight = 64;
export const ToolbarHieght = 80;
