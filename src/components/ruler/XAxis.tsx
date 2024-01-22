import Arrows from "./Arrows";
import { useState } from "react";
import Numbers from "./Numbers";
import { LineRange } from "@/type/Line";
import { useNumbersLineContext } from "@/context/numbersLineContext";

const XAxis = () => {
  const [startIndex, setStartIndex] = useState(0);
  const { kind } = useNumbersLineContext();

  return (
    <>
      {kind == LineRange.hundred && <Arrows startIndex={startIndex} setStartIndex={setStartIndex} />}
      <div className="fixed left-0 right-0 flex justify-between border-t-4 border-gray-900 pt-0 mx-0  pl-8 pr-8 ">
        <Numbers startIndex={startIndex} setStartIndex={setStartIndex} />
      </div>
    </>
  );
};

export default XAxis;
