import { useEffect } from "react";
import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { RulerMargin } from "../consts/elementConsts";

const Ruler = () => {
  const { windowSize, setLeftPositionValid, setIdDraggElementClick } = useNumbersLineContext();

  useEffect(() => {
    setLeftPositionValid(0);
    setIdDraggElementClick("");
  }, [windowSize.width]);

  return (
    <div style={{ paddingBottom: RulerMargin + "px" }}>
      <Arrows />
      <XAxis />
    </div>
  );
};

export default Ruler;
