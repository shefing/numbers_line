import {useNumbersLineContext} from "../../context/numbersLineContext"
import { LineRange } from "../../const/Line";

interface IProps {
  labels: number[];
  startIndex: number;
}
const Numbers = ({ labels, startIndex }: IProps) => {
  const { kind } = useNumbersLineContext();
  var flag = kind == LineRange.hundredCircular;
  return (
    <>
      {labels.slice(startIndex, startIndex + 21).map((label) => (
        <div
          key={label}
          className={`text-xl text-color flex flex-col items-center ${flag && label % 50 == 0 ? "font-bold" : !flag && label % 5 === 0 && "font-bold"}`}
        >
          <div className="h-3 border-l-2 border-gray-900 w-1366 flex-shrink-0" />
          {label}
        </div>
      ))}
    </>
  );
};
export default Numbers;
