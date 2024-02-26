import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { RulerMargin } from "../consts/elementConsts";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { useEffect } from "react";
import { LineRange, RulerLenth } from "@/type/ruler";

const Ruler = () => {
  const { windowSize, typeRuler, setRulerPaddingSides } = useNumbersLineContext();

  useEffect(() => {
    typeRuler == LineRange.hundred && setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2);
  }, [windowSize]);

  return (
    <>
      <Arrows />
      <div style={{ bottom: windowSize.height * RulerMargin + "px", position: "absolute" }}>
        <XAxis />
      </div>
    </>
  );
};

export default Ruler;
