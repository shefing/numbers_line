import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange, RulerLenth } from "../type/ruler";
import { RulerPaddingSides } from "../consts/elementConsts";
import { TypeCover } from "../type/elements";

export const useHelpers = () => {
  const { windowSize, setTypeRuler, typeRulerChange, setRulerPaddingSides, setLeftPosition, setDragElements, setCoverSituation, setVisitableDisplayButton } =
    useNumbersLineContext();

  const calculatScreenWidth = () => {
    return -windowSize.width * ((LineRange.hundred - RulerLenth.hundred) / RulerLenth.hundred);
  };

  const calculatRulerWidth = () => {
    return windowSize.width - RulerPaddingSides * 2;
  };

  const restart = () => {
    setTypeRuler(typeRulerChange);
    typeRulerChange == LineRange.hundred ? setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2) : RulerPaddingSides;
    setDragElements([]);
    setCoverSituation(TypeCover.allDiscover);
    setVisitableDisplayButton(TypeCover.allDiscover);
    setLeftPosition(0);
  };

  return {
    calculatScreenWidth,
    calculatRulerWidth,
    restart,
  };
};
