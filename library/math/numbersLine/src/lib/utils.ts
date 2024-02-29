import { LineRange, unitAmount } from "../type/ruler";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jumpBaseHeight, jumpHeight } from "../consts/elementConsts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatUnitsAmount = (type: LineRange) => {
  return type == LineRange.hundred || type == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
};

export const calcJumpPosition = (transfomPosition: number, isJumpUnderRuler: boolean): number => {
  const base = transfomPosition + jumpBaseHeight / 3;
  return isJumpUnderRuler ? base : base + jumpHeight - jumpBaseHeight;
};

export const calcXTransform = (transfom: string): number => {
  const match = transfom.match(/\((.*?)px/);
  return match ? parseFloat(match[1]) : 0;
};

export const calcYTransform = (transfom: string): number => {
  const match = transfom.match(/,\s*(-?\d+\.?\d*)px\)/);
  return match ? parseFloat(match[1]) : 0;
};
