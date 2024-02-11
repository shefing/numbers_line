import { useEffect, useState } from "react";
import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { calculatScreenWidth } from "../lib/utils";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { RulerMargin } from "../consts/elementConsts";

const Ruler = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const { windowSize } = useNumbersLineContext();

  useEffect(() => {
    setLeftPosition((prevLeft: number) => Math.max(calculatScreenWidth(windowSize.width), Math.min(0, prevLeft)));
  }, [windowSize.width]);

  useEffect(() => {
    console.log("leftPosition: ", leftPosition);
  }, [leftPosition]);

  return (
    <div style={{ paddingBottom: RulerMargin + "px" }}>
      <Arrows leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
      <XAxis leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
    </div>
  );
};

export default Ruler;
