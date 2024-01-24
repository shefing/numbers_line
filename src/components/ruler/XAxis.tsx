import { useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/Line";
import { calculationWidthScreen } from "@/lib/utils";
import Numbers from "./Numbers";
interface IProps {
  windowWidth: number;
  leftPosition: number;
  setLeftPosition: (val: (val: number) => number) => void;
}
const XAxis = ({ windowWidth, leftPosition, setLeftPosition }: IProps) => {
  const { kind } = useNumbersLineContext();
  const [startX, setStartX] = useState(0);
  const [isDragging, setisDragging] = useState(false);

  const handleStartDrag = (e: any) => {
    setisDragging(true);
    setStartX(e.clientX);
  };

  const handleonDrag = (e: any) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setLeftPosition((prevLeft: number) => Math.max(calculationWidthScreen(windowWidth), Math.min(0, prevLeft + deltaX)));
      setStartX(e.clientX);
    }
  };
  const handleStopDrag = () => {
    setisDragging(false);
  };

  return (
    <>
      {kind == LineRange.hundred ? (
        <div className="pt-5" onMouseDown={handleStartDrag} onMouseMove={handleonDrag} onMouseUp={handleStopDrag} onMouseLeave={handleStopDrag}>
          <Numbers windowWidth={windowWidth} leftPosition={leftPosition} />
        </div>
      ) : (
        <Numbers windowWidth={windowWidth} leftPosition={0} />
      )}
    </>
  );
};

export default XAxis;
