import { baseJumpClassName } from "../styles/jump";
import { calculatUnitsAmount } from "./utils";
import { LineRange } from "../type/ruler";
import { jumpArrowHeight, jumpBaseHeight } from "../consts/elementConsts";

export const MatchBaseJumpClassName = (underRuler: boolean) => {
  return underRuler ? baseJumpClassName + " bg-[#F48460] mb-[1rem]" : baseJumpClassName + " bg-[#009FDE] mt-[1rem]";
};
export const calcWidthStartPosition = (value: number, windowWidth: number, type: LineRange) => {
  return (windowWidth - windowWidth / calculatUnitsAmount(type)) / value;
};
export const calcHeightStartPosition = (value: number, windowHeight: number): number => {
  return windowHeight / value;
};
export const calcJumpPosition = (transfomPosition: number, isJumpUnderRuler: boolean): number => {
  const base = transfomPosition + jumpBaseHeight / 3;
  return isJumpUnderRuler ? base : base + jumpArrowHeight + +jumpBaseHeight / 3;
};
