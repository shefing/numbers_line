import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { rulerLocation } from "../consts/elementConsts";
import { useNumbersLineContext } from "@/context/numbersLineContext";

const Ruler = () => {
  const { windowSize } = useNumbersLineContext();
  return (
    <div style={{ position: "absolute", bottom: rulerLocation * windowSize.height, width: "100%" }}>
      <Arrows />
      <XAxis />
    </div>
  );
};

export default Ruler;
