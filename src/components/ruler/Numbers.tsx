import { useEffect, useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange, RulerLenth } from "../../type/Line";
interface IProps {
  windowWidth: number;
  leftPosition: number;
}
const Numbers = ({ windowWidth, leftPosition }: IProps) => {
  const { kind } = useNumbersLineContext();
  const [labels, setLabels] = useState<number[]>([]);

  useEffect(() => {
    let array = Array.from({ length: kind == LineRange.hundredCircular ? kind + 1 : kind }, (_, index) => index);
    setLabels(array);
  }, [kind]);

  return (
    <div
      className="fixed left-0 right-0 flex justify-between border-t-4 border-gray-900 pt-0 mx-0 pl-8 pr-8"
      style={
        kind == LineRange.hundred
          ? {
              width: windowWidth * (LineRange.hundred / RulerLenth.hundred),
              left: `${leftPosition}px`,
              cursor: "move",
            }
          : {}
      }
    >
      {labels.map((label) =>
        kind != LineRange.hundredCircular || label % 10 == 0 ? (
          <div key={label} className="flex flex-col items-center">
            <div className="h-4 border-l-4 border-gray-900 w-1366" />
            <div className={`pl-10 pr-10 select-none text-2xl text-color absolute m-4 ${label % 5 === 0 && "font-bold"}`}>{label}</div>
          </div>
        ) : (
          <div key={label} className="h-2 border-l-2 border-gray-900 w-1366" />
        )
      )}
    </div>
  );
};
export default Numbers;
