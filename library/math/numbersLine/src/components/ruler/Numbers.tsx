import { useEffect, useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange, RulerLenth } from "../../type/Line";
import { TypeCover } from "@/type/elements";
import { createClassNameToNumbersAtLine } from "@/lib/utils";
interface IProps {
  windowWidth: number;
  leftPosition: number;
}
const Numbers = ({ windowWidth, leftPosition }: IProps) => {
  const { type, coverSituation } = useNumbersLineContext();
  const [labels, setLabels] = useState<number[]>([]);
  const [labelsCover, setClickedLabelsCover] = useState(new Set());
  useEffect(() => {
    let array = Array.from({ length: type == LineRange.hundredCircular ? type + 1 : type }, (_, index) => index);
    setLabels(array);
  }, [type]);

  useEffect(() => {
    if (coverSituation == TypeCover.allCover) {
      setClickedLabelsCover(new Set(labels));
    }
    if (coverSituation == TypeCover.allDiscover) {
      setClickedLabelsCover(new Set());
    }
  }, [coverSituation]);

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
      className="fixed left-0 right-0 flex justify-between border-t-4 border-gray-900 pt-0 mx-0 pl-8 pr-8"
      style={
        type == LineRange.hundred
          ? {
              width: windowWidth * (LineRange.hundred / RulerLenth.hundred),
              left: `${leftPosition}px`,
              cursor: "move",
            }
          : {}
      }
    >
      {labels.map((label) =>
        type != LineRange.hundredCircular || label % 10 == 0 ? (
          <div key={label} className="flex flex-col items-center">
            <div className="h-4 border-l-4 border-gray-900 w-1366" />
            <div className={createClassNameToNumbersAtLine(label, labelsCover, coverSituation)} onClick={() => displayLabel(label)}>
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
