import {
  IActionIcon,
  IDisplayRuller,
  IRulerDefinition,
  ActionTypes,
  TypeCover,
  IUrl,
  NaviKeniIconsTypes,
  IIconsNaviKeni,
  WritingSituation,
  IWritingSituation,
  Colors,
} from "../type/toolbar";
import { LineRange } from "../type/ruler";
import jump from "/assets/icons/toolbar/jump.svg";
import jumpHover from "/assets/icons/toolbar/jumpHover.svg";
import text from "/assets/icons/toolbar/text.svg";
import textHover from "/assets/icons/toolbar/textHover.svg";
import writing from "/assets/icons/toolbar/writing.svg";
import writingHover from "/assets/icons/toolbar/writingHover.svg";
import writingBlue from "/assets/icons/toolbar/writingBlue.svg";
import writingGreen from "/assets/icons/toolbar/writingGreen.svg";
import writingOrange from "/assets/icons/toolbar/writingOrange.svg";
import writingDelete from "/assets/icons/toolbar/writingDelete.svg";
import writingOpen from "/assets/icons/toolbar/writingOpen.svg";
import eye from "/assets/icons/toolbar/eye.svg";
import eyeHover from "/assets/icons/toolbar/eyeHover.svg";
import eyeOpen from "/assets/icons/toolbar/eyeOpen.svg";
import naviAndKeni from "/assets/icons/toolbar/naviAndKeni.svg";
import naviAndKeniHover from "/assets/icons/toolbar/naviAndKeniHover.svg";
import naviAndKeniOpen from "/assets/icons/toolbar/naviAndKeniOpen.svg";
import restart from "/assets/icons/toolbar/restart.svg";
import restartHover from "/assets/icons/toolbar/restartHover.svg";
import restartOpen from "/assets/icons/toolbar/restartOpen.svg";
import restartDisable from "/assets/icons/toolbar/restartDisable.svg";
import navi from "/assets/icons/navi.svg";
import naviHover from "/assets/icons/naviHover.svg";
import keni from "/assets/icons/keni.svg";
import keniHover from "/assets/icons/keniHover.svg";
import writingBlueMenu from "/assets/icons/writingBlueMenu.svg";
import writingGreenMenu from "/assets/icons/writingGreenMenu.svg";
import writingOrangeMenu from "/assets/icons/writingOrangeMenu.svg";
import writingDeleteMenu from "/assets/icons/writingDeleteMenu.svg";

const restartUrls: IUrl = { url: restart, hover: restartHover, open: restartOpen, disable: restartDisable };
const naviAndKeniUrls: IUrl = { url: naviAndKeni, hover: naviAndKeniHover, open: naviAndKeniOpen };
const eyetUrls: IUrl = { url: eye, hover: eyeHover, open: eyeOpen };
const writingUrls: IUrl = { url: writing, hover: writingHover, open: writingOpen, blue: writingBlue, green: writingGreen, orange: writingOrange, delete: writingDelete };
const textUrls: IUrl = { url: text, hover: textHover };
const jumpUrls: IUrl = { url: jump, hover: jumpHover };

export const actionIconsDetials: IActionIcon[] = [
  { type: ActionTypes.restart, url: restartUrls },
  { type: ActionTypes.naviAndKeni, url: naviAndKeniUrls, isMenu: true },
  { type: ActionTypes.displayNumbersLine, url: eyetUrls, isMenu: true },
  { type: ActionTypes.writing, url: writingUrls, isMenu: true },
  { type: ActionTypes.text, url: textUrls, isDragged: true },
  { type: ActionTypes.jump, url: jumpUrls, isDragged: true },
];

export const rulerDefinitionButtonDetials: IRulerDefinition[] = [
  { type: "0-10", choice: LineRange.ten },
  { type: "0-20", choice: LineRange.twenty },
  { type: "0-100", choice: LineRange.hundredCircular },
  { type: "0-100", choice: LineRange.hundred },
];

export const displayRulerButtonDetials: IDisplayRuller[] = [
  { type: "hide_everything", visitDisable: TypeCover.allCover, choice: TypeCover.allCover },
  { type: "hide_partially", visitDisable: TypeCover.randomly, choice: TypeCover.randomly },
  { type: "hide_manually", visitDisable: TypeCover.allCover, choice: TypeCover.partiallyCover },
  { type: "show_manually", visitDisable: TypeCover.allDiscover, choice: TypeCover.partiallyDiscover },
  { type: "show_all", visitDisable: TypeCover.allDiscover, choice: TypeCover.allDiscover },
];

export const iconsNaviKeni: IIconsNaviKeni[] = [
  { type: NaviKeniIconsTypes.navi, url: navi, urlHover: naviHover },
  { type: NaviKeniIconsTypes.keni, url: keni, urlHover: keniHover },
];

export const writingSituationList: IWritingSituation[] = [
  { type: { description: WritingSituation.blue, url: Colors.blue }, url: writingBlueMenu },
  { type: { description: WritingSituation.green, url: Colors.green }, url: writingGreenMenu },
  { type: { description: WritingSituation.orange, url: Colors.orange }, url: writingOrangeMenu },
  { type: { description: WritingSituation.delete, url: Colors.delete }, url: writingDeleteMenu },
];
export const cursorColors: Record<string, string> = { Blue: "cursor-blue", Green: "cursor-green", Orange: "cursor-orange", Delete: "cursor-delete" };

export const RulerPaddingSides = 32;
export const rulerMargin = 0.35;
export const ruleHeight = 50;
export const grassHeight = 150;
export const barWidth = 4;
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
export const brushWidth = 5;
export const drawSpace = 20;
export const dragElementID = "dragElement";
export const keboardActioKeys = ["Backspace", "Delete", "Enter", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
export const keboardLayers = ["7 8 9 - = ⌫", "4 5 6 + < >", "1 2 3 x ≤ ≥", ", 0 . / ⏎"];
export const keboardDifferentlButton = "⏎";
export const keboardNormalButtons = keboardLayers.filter((item) => item !== keboardDifferentlButton).join(" ");
