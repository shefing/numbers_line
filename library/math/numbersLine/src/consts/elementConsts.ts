import { IActionIcon, IDisplayRuller, TypeActionIconsToolbar, TypeCover } from "../type/elements";
import jump from "/assets/icons/toolbar/jump.svg";
import text from "/assets/icons/toolbar/text.svg";
import writing from "/assets/icons/toolbar/writing.svg";
import eye from "/assets/icons/toolbar/eye.svg";
import naviAndKani from "/assets/icons/toolbar/naviAndKani.svg";
import reload from "/assets/icons/toolbar/reload.svg";

export const actionIconsDetials: IActionIcon[] = [
    {type:TypeActionIconsToolbar.naviAndKani, url:naviAndKani},
    {type:TypeActionIconsToolbar.displayNumbersLine, url:eye},
    {type:TypeActionIconsToolbar.reload, url:reload},
    {type:TypeActionIconsToolbar.writing, url:writing},
    {type:TypeActionIconsToolbar.text, url:text},
    {type:TypeActionIconsToolbar.jump, url:jump},
  ]
  export const displayRulerButtonDetials: IDisplayRuller[] = [
    { type: "הסתר הכל", visitAble: TypeCover.allCover, choice: TypeCover.allCover },
    { type: "הסתר חלקית", visitAble: TypeCover.randomly, choice: TypeCover.randomly },
    { type: "הסתר ידנית", visitAble: TypeCover.allCover, choice: TypeCover.partiallyCover },
    { type: "הצג ידנית", visitAble: TypeCover.allDiscover, choice: TypeCover.partiallyDiscover },
    { type: "הצג הכל", visitAble: TypeCover.allDiscover, choice: TypeCover.allDiscover },
  ];

  export const RulerPadding = 32;
  export const RulerMargin = window.innerHeight * 0.25;
  export const jumpBaseHeight= 40;
  export const jumpArrowHeight= 64;


