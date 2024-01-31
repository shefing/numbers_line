import { buttonEyeClassName, buttonEyeDisabledClassName } from "../styles/button"
import { LineRange, RulerLenth } from "@/type/Line"
import { TypeCover } from "../type/elements"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculationWidthScreen = (windowWidth: number)=>{
  return -windowWidth*((LineRange.hundred-RulerLenth.hundred)/RulerLenth.hundred)
}

export const getImageSrc = (url: string,isHovered:boolean , isOpen:boolean) => {
  const dotIndex = url.indexOf('.');
  const beforeDot = url.substring(0, dotIndex);
  return isOpen? beforeDot+'Open.svg': isHovered ? beforeDot+'Hover.svg' : url;
};

export const MatchButtonClassName = (coverSituation :TypeCover, isDisable: TypeCover, isChoice: TypeCover) => {
  if(coverSituation == isDisable )
     return buttonEyeClassName+ buttonEyeDisabledClassName;
 if(coverSituation == isChoice)
     return buttonEyeClassName+" bg-[#7BC8EF] text-white"
 return buttonEyeClassName
};

export const createClassNameToNumbersAtLine=(label:number, labelsCover:Set<unknown>, coverSituation:TypeCover):string =>{
  let className = "pl-10 pr-10 select-none text-2xl absolute m-5";
  if(label % 5 === 0)
      className=className+" font-bold";
  if(coverSituation == TypeCover.partiallyCover || coverSituation == TypeCover.partiallyDiscover)
      className=className+" cursor-pointer";
  if(labelsCover.has(label))
      className=className+" text-[white]";
  return className;
}