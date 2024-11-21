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

  const rulerWidth = () => {
    const padding = rulerType == LineRange.hundred || rulerType == LineRange.twenty ? windowSize.width / 21 / 2 : RulerPaddingSides;
    return windowSize.width - padding * 2;
  };

  const unitsAmount = () => {
    return rulerType == LineRange.hundred || rulerType == LineRange.twenty ? unitAmount.twenty : unitAmount.ten;
  };  

  const rulerPaddingSides = () => {
    return rulerType == LineRange.hundred || rulerType == LineRange.twenty ? unit / 2 : RulerPaddingSides;
  };

    const jumpHeightWithoutBase = () => {
    return windowSize.height > screenHeightMinimum ?  jumpArrowHeightConst + jumpToArrowDistance : jumpArrowHeightRelative * windowSize.height + (jumpToArrowDistance/2);
  };

   const calcYElementPosition = (transfomPosition: number, element: IElement, unit: number): number => {
  if (element.jump) {
    const base = transfomPosition + jumpBaseHeight / 3;
    return element.jump.underRuler ? base : base + jumpHeightWithoutBase();
  }
  return element.icons ? transfomPosition + element.icons?.heightRelativelyWidth * element.icons.widthRelatively * unit : 0;
};

  const xAxisFactor = (): number => {
  return unitsAmount() == unitAmount.twenty ? 2 : 1;
};

  const widthRatio = (transform: string): number => {
    return calcXTransform(transform)/windowSize.width;
  };

  const heightRatio = (transform: string): number => {
    return calcYTransform(transform)/windowSize.height;
  };

  const rulerPosition = (): number => {
    return windowSize.height - (windowSize.height * rulerLocation) - ruleHeight;
  };

  const xRatio = (xPosition:number): number => {
      if(unitsAmount() == unitAmount.twenty)
        return (xPosition- 0.5*unit) / (windowSize.width - unit)
      return (xPosition- RulerPaddingSides) / (windowSize.width - 2 * RulerPaddingSides)
  };

  const yRatio = (yPosition: number): number => {
      if(rulerPosition() < yPosition)
        return (yPosition - rulerPosition()) / (windowSize.height - rulerPosition()) * -1
      return yPosition / rulerPosition()
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
    rulerWidth,
    unitsAmount,
    rulerPaddingSides,
    heightRatio,
    widthRatio,
    jumpHeightWithoutBase,
    calcYElementPosition,
    rulerPosition,
    xAxisFactor,
    xRatio,
    yRatio,
    restart,
  };
};
