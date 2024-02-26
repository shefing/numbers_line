import { LineRange, unitAmount } from "../type/ruler";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jumpArrowHeight, jumpBaseHeight } from "../consts/elementConsts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatUnitsAmount = (type: LineRange) => {
  return type == LineRange.hundred || type == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
};

export const calcWidthStartPosition = (value: number, windowWidth: number, type: LineRange) => {
  return (windowWidth - windowWidth / calculatUnitsAmount(type)) / value;
};
export const calcHeightStartPosition = (value: number, windowHeight: number): number => {
  return windowHeight / value;
};
export const calcJumpPosition = (transfomPosition: number, isJumpUnderRuler: boolean): number => {
  const base = transfomPosition + jumpBaseHeight / 3;
  return isJumpUnderRuler ? base : base + jumpArrowHeight + jumpBaseHeight / 3;
};
