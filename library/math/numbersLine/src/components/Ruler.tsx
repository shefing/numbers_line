import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { grassHeight, ruleHeight, rulerMargin } from "../consts/elementConsts";
import { useNumbersLineContext } from "../context/numbersLineContext";

const Ruler = () => {
  const { windowSize } = useNumbersLineContext();

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
