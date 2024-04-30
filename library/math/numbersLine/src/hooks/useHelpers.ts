import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange, unitAmount } from "../type/ruler";
import { RulerPaddingSides } from "../consts/elementConsts";
import { TypeCover } from "../type/toolbar";

export const useHelpers = () => {
  const {
    windowSize,
    unit,
    rulerType,
    setrulerType,
    rulerTypeShould,
    setLeftPosition,
    setDragElements,
    setDuplicateElementSpace,
    setCoverSituation,
    setVisitableDisplayButton,
    setZIndexCounter,
  } = useNumbersLineContext();

  const calculatScreenWidth = () => {
    return -(unit * (LineRange.hundred - 20) - RulerPaddingSides * 2);
  };

  const calculatRulerWidth = () => {
    return windowSize.width - RulerPaddingSides * 2;
  };

  const calculatUnitsAmount = () => {
    return rulerType == LineRange.hundred || rulerType == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
  };
  const calculatRulerPaddingSides = () => {
    return rulerType == LineRange.hundred || rulerType == LineRange.twenty ? unit / 2 : RulerPaddingSides;
  };
  const restart = () => {
    setrulerType(rulerTypeShould);
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
    calculatRulerPaddingSides,
    restart,
  };
};
