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
      <Numbers startIndex={startIndex} setStartIndex={setStartIndex} />
    </>
  );
};

export default XAxis;
