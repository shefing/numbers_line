import { LineRange, RulerLenth } from "../type/Line"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculationWidthScreen = (windowWidth:number)=>{
  return -windowWidth*((LineRange.hundred-RulerLenth.hundred)/RulerLenth.hundred)
}



export const getImageSrc = (url: string,isHovered:boolean , isOpen:boolean) => {
  const dotIndex = url.indexOf('.');
  const beforeDot = url.substring(0, dotIndex);
  return isOpen? beforeDot+'Open.svg': isHovered ? beforeDot+'Hover.svg' : url;
};
