import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange, RulerLenth, unitAmount } from "../type/ruler";
import { RulerPaddingSides } from "../consts/elementConsts";
import { TypeCover } from "../type/elements";

export const useHelpers = () => {
  const {
    windowSize,
    typeRuler,
    setTypeRuler,
    typeRulerChange,
    setRulerPaddingSides,
    setLeftPosition,
    setDragElements,
    setDuplicateElementSpace,
    setCoverSituation,
    setVisitableDisplayButton,
  } = useNumbersLineContext();

  const calculatScreenWidth = () => {
    return -windowSize.width * ((LineRange.hundred - RulerLenth.hundred) / RulerLenth.hundred);
  };

  const calculatRulerWidth = () => {
    return windowSize.width - RulerPaddingSides * 2;
  };

  const calculatUnitsAmount = () => {
    return typeRuler == LineRange.hundred || typeRuler == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
  };
  const restart = () => {
    setTypeRuler(typeRulerChange);
    typeRulerChange == LineRange.hundred ? setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2) : RulerPaddingSides;
    setDragElements([]);
    setCoverSituation(TypeCover.allDiscover);
    setVisitableDisplayButton(TypeCover.allDiscover);
    setLeftPosition(0);
    setDuplicateElementSpace(0);
  };

  return {
    calculatScreenWidth,
    calculatRulerWidth,
    calculatUnitsAmount,
    restart,
  };
};
