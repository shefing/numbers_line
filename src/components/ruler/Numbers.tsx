import { useEffect, useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/Line";
interface IProps {
  leftPosition: number;
}
const Numbers = ({ leftPosition }: IProps) => {
  const { kind } = useNumbersLineContext();
  const [labels, setLabels] = useState<number[]>([]);

  useEffect(() => {
    let array: number[] = [];
    array = Array.from({ length: kind == LineRange.hundred ? kind + 1 : kind }, (_, index) => index);
    setLabels(array);
  }, [kind]);

  return (
    <div
      className="fixed left-0 right-0 flex justify-between border-t-4 border-gray-900 pt-0 mx-0 pl-8 pr-8"
      style={kind == LineRange.hundred ? { width: window.innerWidth * 4.8, left: `${leftPosition}px` } : {}}
    >
      {labels.map((label) =>
        kind != LineRange.hundredCircular || label % 10 == 0 ? (
          <div key={label} className="flex flex-col items-center">
            <div className="h-4 border-l-4 border-gray-900 w-1366" />
            <div className={`select-none text-2xl text-color absolute m-4 ${label % 5 === 0 && "font-bold"}`}>{label}</div>
          </div>
        ) : (
          <div key={label} className="h-2 border-l-2 border-gray-900 w-1366" />
        )
      )}
    </div>
  );
};
export default Numbers;
