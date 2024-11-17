import { calcXTransform, calcYTransform } from "@/lib/utils";
import { IElement } from "@/type/moveable";
import { jumpArrowHeightConst, jumpArrowHeightRelative, jumpBaseHeight, jumpToArrowDistance, ruleHeight, rulerLocation, RulerPaddingSides, screenHeightMinimum } from "../consts/elementConsts";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange, unitAmount } from "../type/ruler";
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
    return -(unit * (LineRange.hundred - 21));
  };

  const calculatRulerWidth = () => {
    const padding = rulerType == LineRange.hundred || rulerType == LineRange.twenty ? windowSize.width / 21 / 2 : RulerPaddingSides;
    return windowSize.width - padding * 2;
  };

  const calculatUnitsAmount = () => {
    return rulerType == LineRange.hundred || rulerType == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
  };  

  const calculatRulerPaddingSides = () => {
    return rulerType == LineRange.hundred || rulerType == LineRange.twenty ? unit / 2 : RulerPaddingSides;
  };

    const calculatJumpHeightWithoutBase = () => {
    return windowSize.height > screenHeightMinimum ?  jumpArrowHeightConst + jumpToArrowDistance : jumpArrowHeightRelative * windowSize.height + (jumpToArrowDistance/2);
  };

   const calcYElementPosition = (transfomPosition: number, element: IElement, unit: number): number => {
  if (element.jump) {
    const base = transfomPosition + jumpBaseHeight / 3;
    return element.jump.underRuler ? base : base + calculatJumpHeightWithoutBase();
  }
  return element.icons ? transfomPosition + element.icons?.heightRelativelyWidth * element.icons.widthRelatively * unit : 0;
};

  const duplicateIfLength20 = (): number => {
  return calculatUnitsAmount() == unitAmount.twenty ? 2 : 1;
};

  const calculatWidthRatio = (transform: string): number => {
    return calcXTransform(transform)/windowSize.width;
  };

  const calculatHeightRatio = (transform: string): number => {
    return calcYTransform(transform)/windowSize.height;
  };

  const calculatRulerPosition = (): number => {
    return windowSize.height - (windowSize.height * rulerLocation) - ruleHeight;
  };

  const calculatXRatio = (xPosition:number): number => {
      if(calculatUnitsAmount() == unitAmount.twenty)
        return (xPosition- 0.5*unit) / (windowSize.width - unit)
      return (xPosition- RulerPaddingSides) / (windowSize.width - 2 * RulerPaddingSides)
  };

  const calculatYRatio = (yPosition: number): number => {
      if(calculatRulerPosition() < yPosition)
        return (yPosition - calculatRulerPosition()) / (windowSize.height - calculatRulerPosition()) * -1
      return yPosition / calculatRulerPosition()
  };

  const restart = () => {
    setrulerType(rulerTypeShould);
    setDragElements([]);
    setCoverSituation(TypeCover.allDiscover);
    setVisitableDisplayButton(TypeCover.allDiscover);
    setLeftPosition(0);
    setDuplicateElementSpace(0);
    setZIndexCounter(1);
  };

  return {
    calculatScreenWidth,
    calculatRulerWidth,
    calculatUnitsAmount,
    calculatRulerPaddingSides,
    calculatHeightRatio,
    calculatWidthRatio,
    calculatJumpHeightWithoutBase,
    calcYElementPosition,
    calculatRulerPosition,
    duplicateIfLength20,
    calculatXRatio,
    calculatYRatio,
    restart,
  };
};
