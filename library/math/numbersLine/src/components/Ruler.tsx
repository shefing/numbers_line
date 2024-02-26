import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { RulerPadding } from "../consts/elementConsts";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { useEffect } from "react";
import { LineRange } from "@/type/ruler";

const Ruler = () => {
  const { windowSize, typeRuler, setRulerPaddingSides } = useNumbersLineContext();

  useEffect(() => {
    typeRuler == LineRange.hundred && setRulerPaddingSides(windowSize.width / 42);
  }, [windowSize]);

  return (
    <div style={{ marginBottom: windowSize.height * 0.25 - RulerPadding + "px" }}>
      <Arrows />
      <XAxis />
    </div>
  );
};

export default Ruler;
