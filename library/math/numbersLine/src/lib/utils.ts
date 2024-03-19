import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jumpBaseHeight, jumpHeight } from "../consts/elementConsts";
import { IElement } from "../type/moveable";
import { WritingSituation } from "../type/toolbar-menu";

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

export const getSrc = (url: string, isHovered: boolean, isClicked?: boolean, isDisabled?: boolean, writingSituation?: WritingSituation) => {
  const dotIndex = url.indexOf(".");
  const beforeDot = url.substring(0, dotIndex);
  return isClicked
    ? beforeDot + "Open.svg"
    : isHovered
    ? beforeDot + "Hover.svg"
    : isDisabled
    ? beforeDot + "Disable.svg"
    : writingSituation
    ? beforeDot + writingSituation + ".svg"
    : url;
};
