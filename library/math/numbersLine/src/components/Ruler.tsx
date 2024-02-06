import { useEffect, useState } from "react";
import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { calculatScreenWidth } from "../lib/utils";
import { useNumbersLineContext } from "../context/numbersLineContext";

const Ruler = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const { windowWidth } = useNumbersLineContext();

  useEffect(() => {
    const screenWidth = calculatScreenWidth(windowWidth);
    setLeftPosition(screenWidth);
  }, [windowWidth]);

  return (
    <div className="ruler pb-[20%]">
      <Arrows leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
      <XAxis leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
    </div>
  );
};

export default Ruler;
