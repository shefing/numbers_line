import { IActionIcon, IDisplayRuller, TypeActionIconsToolbar, TypeCover } from "../type/elements";
import jump from "/assets/icons/toolbar/jump.svg";
import text from "/assets/icons/toolbar/text.svg";
import writing from "/assets/icons/toolbar/writing.svg";
import eye from "/assets/icons/toolbar/eye.svg";
import naviAndKani from "/assets/icons/toolbar/naviAndKani.svg";
import raload from "/assets/icons/toolbar/raload.svg";

export const actionIconsDetials: IActionIcon[] = [
    {type:TypeActionIconsToolbar.naviAndKani, url:naviAndKani},
    {type:TypeActionIconsToolbar.displayNumbersLine, url:eye},
    {type:TypeActionIconsToolbar.raload, url:raload},
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
