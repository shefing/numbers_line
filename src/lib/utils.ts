import { LineRange, RulerLenth } from "@/type/Line"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculationWidthScreen = (windowWidth: number)=>{
  return -windowWidth*((LineRange.hundred-RulerLenth.hundred)/RulerLenth.hundred)
}