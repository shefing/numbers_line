import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { rulerMargin } from "../consts/elementConsts";
import { useNumbersLineContext } from "../context/numbersLineContext";

const Ruler = () => {
  const { windowSize } = useNumbersLineContext();

  return (
    <>
      <Arrows />
      <div style={{ marginBottom: windowSize.height * rulerMargin + "px" }}>
        <XAxis />
      </div>
    </>
  );
};

export default Ruler;
