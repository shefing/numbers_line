import { RulerPaddingSides } from "@/consts/elementConsts";
import { LineRange, RulerLenth, unitAmount } from "../type/ruler";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatScreenWidth = (windowWidth: number) => {
  return -windowWidth * ((LineRange.hundred - RulerLenth.hundred) / RulerLenth.hundred);
};

export const calculatRulerWidth = (windowWidth: number) => {
  return windowWidth - RulerPaddingSides * 2;
};

export const getImageSrc = (url: string, isHovered: boolean, isOpen: boolean, isDisable?: boolean) => {
  const dotIndex = url.indexOf(".");
  const beforeDot = url.substring(0, dotIndex);
  return isOpen ? beforeDot + "Open.svg" : isHovered ? beforeDot + "Hover.svg" : isDisable ? beforeDot + "Disable.svg" : url;
};

export const calculatUnitsAmount = (type: LineRange) => {
  return type == LineRange.hundred || type == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
};
