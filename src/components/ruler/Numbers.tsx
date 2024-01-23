import { useEffect, useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange, RulerItem, RulerLenth } from "../../type/Line";

interface IProps {
  startIndex: number;
  setStartIndex: (val: number) => void;
}

const Numbers = ({ startIndex, setStartIndex }: IProps) => {
  const { kind } = useNumbersLineContext();
  var endIndex = kind == LineRange.hundred ? RulerLenth.hundred : RulerLenth.other;
  const [isDragging, setIsDragging] = useState(false);
  const [labels, setLabels] = useState<RulerItem[]>([]);
  const [startX, setStartX] = useState<number>(0);

  useEffect(() => {
    setStartIndex(0);
    let array: RulerItem[] = [];
    if (kind == LineRange.hundredCircular)
      array = Array.from({ length: kind + 1 }, (_, index) => (index % 10 == 0 ? { value: index, isMainLine: true } : { value: index, isMainLine: false }));
    else array = Array.from({ length: kind }, (_, index) => ({ value: index, isMainLine: true }));
    setLabels(array);
  }, [kind]);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      const windowWidth = window.innerWidth / 22;
      const steps = Math.round(deltaX / windowWidth) * -1;
      const newIndex = Math.max(0, Math.min(80, startIndex + steps));
      newIndex != startIndex && setStartIndex(newIndex);
    }
  };

  const handleMouseUp = (e: any) => {
    // const deltaX = e.clientX - startX;
    // const windowWidth = window.innerWidth / 22;
    // const steps = Math.round(deltaX / windowWidth) * -1;
    // const newIndex = Math.max(0, Math.min(80, startIndex + steps));
    // setStartIndex(newIndex);
    setIsDragging(false);
  };

  return (
    <div
      className={`fixed left-0 right-0 flex justify-between border-t-4 border-gray-900 pt-0 mx-0 pl-8 pr-8 ${kind === LineRange.hundred && "cursor-move"}`}
      onMouseDown={kind === LineRange.hundred ? handleMouseDown : undefined}
      onMouseMove={kind === LineRange.hundred ? handleMouseMove : undefined}
      onMouseUp={kind === LineRange.hundred ? handleMouseUp : undefined}
    >
      {labels.slice(startIndex, startIndex + endIndex).map(({ value, isMainLine }) =>
        isMainLine ? (
          <div className="flex flex-col items-center">
            <div className="h-4 border-l-4 border-gray-900 w-1366" />
            <div key={value} className={`select-none text-2xl text-color absolute m-4 ${value % 5 === 0 && "font-bold"}`}>
              {value}
            </div>
          </div>
        ) : (
          <div key={value} className="h-2 border-l-2 border-gray-900 w-1366" />
        )
      )}
    </div>
  );
};
export default Numbers;
