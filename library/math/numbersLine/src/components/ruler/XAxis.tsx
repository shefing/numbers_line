import { useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/Line";
import { calculatScreenWidth } from "../../lib/utils";
import Numbers from "./Numbers";
interface IProps {
  leftPosition: number;
  setLeftPosition: (val: (val: number) => number) => void;
}
const XAxis = ({ leftPosition, setLeftPosition }: IProps) => {
  const { windowSize, type } = useNumbersLineContext();
  const [startX, setStartX] = useState(0);
  const [isDragging, setisDragging] = useState(false);

  const handleStartDrag = (e: any) => {
    setisDragging(true);
    setStartX(e.clientX);
  };

  const handleonDrag = (e: any) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setLeftPosition((prevLeft: number) => Math.max(calculatScreenWidth(windowSize.width), Math.min(0, prevLeft + deltaX)));
      setStartX(e.clientX);
    }
  };
  const handleStopDrag = () => {
    setisDragging(false);
  };

  return (
    <>
      {type == LineRange.hundred ? (
        <div className="pt-5" onMouseDown={handleStartDrag} onMouseMove={handleonDrag} onMouseUp={handleStopDrag} onMouseLeave={handleStopDrag}>
          <Numbers leftPosition={leftPosition} />
        </div>
      ) : (
        <Numbers leftPosition={0} />
      )}
    </>
  );
};

export default XAxis;
