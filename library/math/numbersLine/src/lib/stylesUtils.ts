
import { TypeCover } from "../type/elements"
import { buttonEyeClassName, buttonEyeDisabledClassName } from "../styles/button"
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { baseJumpClassName } from "../styles/jump";
import { calculatUnitsAmount } from "./utils";
import { LineRange } from "../type/ruler";
import { jumpArrowHeight } from "../consts/elementConsts";

export const MatchDisplayButtonClassName = ( isVisitAble: TypeCover, isChoice: TypeCover) => {
  const { coverSituation, visitableDisplayButton } = useNumbersLineContext();

    if(visitableDisplayButton == isVisitAble)
       return buttonEyeClassName+ buttonEyeDisabledClassName;
   if(coverSituation == isChoice)
       return buttonEyeClassName+" bg-[#7BC8EF] text-white"
   return buttonEyeClassName
  };

  export const MatchBaseJumpClassName = (underRuler: boolean) => {
    return underRuler ? baseJumpClassName + " bg-[#F48460] mb-[1rem]" : baseJumpClassName + " bg-[#009FDE] mt-[1rem]";
  };
  export const claculateWidthStartingPositionElement = (value: number,windowWidth: number, type: LineRange) => {
    return (windowWidth - (windowWidth / calculatUnitsAmount(type)))/value;
  }
  export const claculateHeightStartingPositionElement = (value: number, windowHeight: number): number => {
    return windowHeight / value;
  }
  export const calculateJumpPosition = (transfomPosition: number, windowHeight: number, isJumpUnderRuler: boolean): number => {
    const base = transfomPosition* 1 + claculateHeightStartingPositionElement(4, windowHeight)* 1;    
    return isJumpUnderRuler ? base : base + jumpArrowHeight;
  };
  


    