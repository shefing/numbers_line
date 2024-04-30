import { useEffect, useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange, PartToCover } from "../../type/ruler";
import { TypeCover } from "../../type/toolbar";
import { RulerPaddingSides } from "../../consts/elementConsts";

const Numbers = () => {
  const { unit, rulerType, leftPosition, coverSituation, setCoverSituation, setVisitableDisplayButton } = useNumbersLineContext();
  const [labels, setLabels] = useState<number[]>([]);
  const [labelsCover, setClickedLabelsCover] = useState(new Set());

  useEffect(() => {
    let array = Array.from({ length: rulerType == LineRange.hundredCircular ? rulerType + 1 : rulerType }, (_, index) => index);
    setCoverSituation(TypeCover.allDiscover);
    setLabels(array);
  }, [rulerType]);

  useEffect(() => {
    if (coverSituation == TypeCover.allCover) {
      setClickedLabelsCover(new Set(labels));
    }
    if (coverSituation == TypeCover.allDiscover) {
      setClickedLabelsCover(new Set());
    }
    if (coverSituation == TypeCover.randomly) {
      const middleElements = labels.slice(1, -1);
      const numberOfElementsToSelect = Math.ceil(middleElements.length * PartToCover);
      const shuffledArray = middleElements.sort(() => Math.random() - 0.5);
      const selectedElements = shuffledArray.slice(0, numberOfElementsToSelect);
      setClickedLabelsCover(new Set(selectedElements));
      setCoverSituation(TypeCover.nothing);
    }
  }, [coverSituation]);

  useEffect(() => {
    labelsCover.size == 0
      ? setVisitableDisplayButton(TypeCover.allDiscover)
      : labelsCover.size == labels.length
      ? setVisitableDisplayButton(TypeCover.allCover)
      : setVisitableDisplayButton(TypeCover.nothing);
  }, [labelsCover]);

  const displayLabel = (label: any) => {
    const newClickedLabels = new Set(labelsCover);
    if (coverSituation === TypeCover.partiallyCover) {
      !newClickedLabels.has(label) && newClickedLabels.add(label);
    }
    if (coverSituation === TypeCover.partiallyDiscover) {
      newClickedLabels.has(label) && newClickedLabels.delete(label);
    }
    setClickedLabelsCover(newClickedLabels);
  };

  return (
    <div
      className={`fixed left-0 right-0 flex justify-between border-t-4 border-gray-900 mx-0`}
      style={
        rulerType == LineRange.hundred
          ? {
              width: unit * (LineRange.hundred - 1) + RulerPaddingSides * 2,
              left: `${leftPosition}px`,
              paddingLeft: `${RulerPaddingSides}px`,
              paddingRight: `${RulerPaddingSides}px`,
            }
          : { paddingLeft: `${RulerPaddingSides}px`, paddingRight: `${RulerPaddingSides}px` }
      }
    >
      {labels.map((label) =>
        rulerType != LineRange.hundredCircular || label % 10 == 0 ? (
          <div key={label} className="flex flex-col items-center">
            <div className="h-6 border-l-4 border-gray-900 w-1366" />
            <div
              className={`pl-2 pr-2 select-none text-2xl absolute m-6 ${label % 5 == 0 && " font-bold"} ${
                (coverSituation == TypeCover.partiallyCover || coverSituation == TypeCover.partiallyDiscover) && " cursor-pointer"
              } ${labelsCover.has(label) && " text-[transparent]"}`}
              onClick={() => displayLabel(label)}
            >
              {label}
            </div>
          </div>
        ) : (
          <div key={label} className="h-2 border-l-2 border-gray-900 w-1366" />
        )
      )}
    </div>
  );
};
export default Numbers;
