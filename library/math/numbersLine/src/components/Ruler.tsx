import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { grassHeight, ruleHeight, rulerMargin } from "../consts/elementConsts";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect } from "react";
import { LineRange, RulerLenth } from "../type/ruler";

const Ruler = () => {
  const { windowSize, typeRuler, setRulerPaddingSides } = useNumbersLineContext();

  useEffect(() => {
    typeRuler == LineRange.hundred && setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2);
  }, [windowSize]);

  return (
    <>
      <Arrows />
      <div style={{ paddingBottom: windowSize.height * rulerMargin - grassHeight - ruleHeight + "px" }}>
        <XAxis />
      </div>
    </>
  );
};

export default Ruler;
