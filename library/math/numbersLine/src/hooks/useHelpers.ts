import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange, RulerLenth, unitAmount } from "../type/ruler";
import { RulerPaddingSides } from "../consts/elementConsts";
import { TypeCover } from "../type/toolbar";

export const useHelpers = () => {
  const {
    windowSize,
    rulerType,
    setrulerType,
    rulerTypeShould,
    setRulerPaddingSides,
    setLeftPosition,
    setDragElements,
    setDuplicateElementSpace,
    setCoverSituation,
    setVisitableDisplayButton,
    setZIndexCounter,
  } = useNumbersLineContext();

  const calculatScreenWidth = () => {
    return -windowSize.width * ((LineRange.hundred - RulerLenth.hundred) / RulerLenth.hundred);
  };

  const calculatRulerWidth = () => {
    return windowSize.width - RulerPaddingSides * 2;
  };

  const calculatUnitsAmount = () => {
    return rulerType == LineRange.hundred || rulerType == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
  };
  const restart = () => {
    setrulerType(rulerTypeShould);
    rulerTypeShould == LineRange.hundred ? setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2) : RulerPaddingSides;
    setDragElements([]);
    setCoverSituation(TypeCover.allDiscover);
    setVisitableDisplayButton(TypeCover.allDiscover);
    setLeftPosition(0);
    setDuplicateElementSpace(0);
    setZIndexCounter(0);
  };

  return {
    calculatScreenWidth,
    calculatRulerWidth,
    calculatUnitsAmount,
    restart,
  };
};
