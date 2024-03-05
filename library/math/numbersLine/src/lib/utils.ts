import { LineRange, unitAmount } from "../type/ruler";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jumpBaseHeight, jumpHeight, keniHeight, naviHeight } from "../consts/elementConsts";
import { IElement } from "@/type/moveable";
import { NaviKeniIconsTypes } from "@/type/elements";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatUnitsAmount = (type: LineRange) => {
  return type == LineRange.hundred || type == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
};

export const calcPosition = (transfomPosition: number, element: IElement): number => {
  if (element.jump) {
    const base = transfomPosition + jumpBaseHeight / 3;
    return element.jump.underRuler ? base : base + jumpHeight - jumpBaseHeight;
  }
  return element.icons?.type == NaviKeniIconsTypes.navi ? transfomPosition + naviHeight : transfomPosition + keniHeight;
};

export const calcXTransform = (transfom: string): number => {
  const match = transfom.match(/\((.*?)px/);
  return match ? parseFloat(match[1]) : 0;
};

export const calcYTransform = (transfom: string): number => {
  const match = transfom.match(/,\s*(-?\d+\.?\d*)px\)/);
  return match ? parseFloat(match[1]) : 0;
};

export const getSrc = (url: string, isHovered: boolean, isClicked?: boolean, isDisabled?: boolean) => {
  const dotIndex = url.indexOf(".");
  const beforeDot = url.substring(0, dotIndex);
  return isClicked ? beforeDot + "Open.svg" : isHovered ? beforeDot + "Hover.svg" : isDisabled ? beforeDot + "Disable.svg" : url;
};
