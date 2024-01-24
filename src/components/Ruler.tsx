import { useEffect, useState } from "react";
import { LineRange } from "@/type/Line";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";

const Ruler = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { kind } = useNumbersLineContext();
  return (
    <div className="absolute w-full bottom-[30%] left-0 right-0">
      {kind == LineRange.hundred && <Arrows windowWidth={windowWidth} leftPosition={leftPosition} setLeftPosition={setLeftPosition} />}
      <XAxis windowWidth={windowWidth} leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
    </div>
  );
};

export default Ruler;
