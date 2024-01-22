import XAxis from "./ruler/XAxis";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange } from "@/type/Line";
const Ruler = () => {
  const { kind } = useNumbersLineContext();

  var labels = [];
  if (kind == LineRange.hundredCircular) labels = Array.from({ length: 11 }, (_, index) => index * 10);
  else labels = Array.from({ length: kind }, (_, index) => index);

  return (
    <div className="absolute w-full bottom-[30%] left-0 right-0">
      <XAxis labels={labels} />
    </div>
  );
};

export default Ruler;
