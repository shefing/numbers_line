import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jumpBaseHeight, jumpHeight } from "../consts/elementConsts";
import { IElement } from "../type/moveable";
import { IUrl, WritingSituation } from "../type/toolbar";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calcPosition = (transfomPosition: number, element: IElement, unit: number): number => {
  if (element.jump) {
    const base = transfomPosition + jumpBaseHeight / 3;
    return element.jump.underRuler ? base : base + jumpHeight - jumpBaseHeight;
  }
  return element.icons ? transfomPosition + element.icons?.heightRelativelyWidth * element.icons.widthRelatively * unit : 0;
};

export const calcXTransform = (transfom: string): number => {
  const match = transfom.match(/\((.*?)px/);
  return match ? parseFloat(match[1]) : 0;
};

export const calcYTransform = (transfom: string): number => {
  const match = transfom.match(/,\s*(-?\d+\.?\d*)px\)/);
  return match ? parseFloat(match[1]) : 0;
};

export const getSrc = (url: IUrl, isHovered: boolean, isClicked: boolean, isDisabled: boolean, writingSituation?: WritingSituation): string => {
  switch (writingSituation) {
    case WritingSituation.blue:
      return url.blue ? url.blue : url.url;
    case WritingSituation.green:
      return url.green ? url.green : url.url;
    case WritingSituation.orange:
      return url.orange ? url.orange : url.url;
    case WritingSituation.delete:
      return url.delete ? url.delete : url.url;
    default:
      return isClicked && url.open ? url.open : isHovered ? url.hover : isDisabled && url.disable ? url.disable : url.url;
  }
};
