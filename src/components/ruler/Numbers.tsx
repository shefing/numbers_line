import { useEffect } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/Line";

interface IProps {
  startIndex: number;
  setStartIndex: (val: number) => void;
}

const Numbers = ({ startIndex, setStartIndex }: IProps) => {
  const { kind } = useNumbersLineContext();
  const endIndex = kind == LineRange.hundredCircular ? 101 : 21;

  var labels = [];
  if (kind == LineRange.hundredCircular)
    labels = Array.from({ length: 101 }, (_, index) => (index % 10 == 0 ? { value: index, isMainLine: true } : { value: index, isMainLine: false }));
  else labels = Array.from({ length: kind }, (_, index) => ({ value: index, isMainLine: true }));

  useEffect(() => {
    setStartIndex(0);
  }, []);
  return (
    <>
      {labels.slice(startIndex, startIndex + endIndex).map(({ value, isMainLine }) =>
        isMainLine ? (
          <div className="flex flex-col items-center">
            <div className="h-4 border-l-4 border-gray-900 w-1366" />
            <div key={value} className={`text-2xl text-color absolute m-4 ${value % 5 === 0 && "font-bold"}`}>
              {value}
            </div>
          </div>
        ) : (
          <div key={value} className="h-3 border-l-2 border-gray-900 w-1366" />
        )
      )}
    </>
  );
};
export default Numbers;
