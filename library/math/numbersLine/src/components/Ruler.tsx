import { useEffect, useState } from "react";
import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { calculationWidthScreen } from "@/lib/utils";

const Ruler = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const ResizeWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", ResizeWidth);

    return () => {
      window.removeEventListener("resize", ResizeWidth);
    };
  }, []);
  useEffect(() => {
    setLeftPosition(calculationWidthScreen(windowWidth));
  }, [windowWidth]);

  return (
    <div className="pb-[10%]">
      <Arrows windowWidth={windowWidth} leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
      <XAxis windowWidth={windowWidth} leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
    </div>
  );
};

export default Ruler;