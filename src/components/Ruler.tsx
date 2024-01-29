import { useEffect, useState } from "react";
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

  return (
    <div className="pb-[10%]">
      <Arrows windowWidth={windowWidth} leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
      <XAxis windowWidth={windowWidth} leftPosition={leftPosition} setLeftPosition={setLeftPosition} />
    </div>
  );
};

export default Ruler;
