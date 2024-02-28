import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange, RulerLenth } from "../type/ruler";
import { RulerPaddingSides } from "../consts/elementConsts";

export const useHelpers = () => {
  const { windowSize } = useNumbersLineContext();

  const calculatScreenWidth = () => {
    return -windowSize.width * ((LineRange.hundred - RulerLenth.hundred) / RulerLenth.hundred);
  };

  const calculatRulerWidth = () => {
    return windowSize.width - RulerPaddingSides * 2;
  };

  return {
    calculatScreenWidth,
    calculatRulerWidth,
  };
};
