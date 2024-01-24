import { useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/Line";
import Numbers from "./Numbers";
interface IProps {
  leftPosition: number;
  setLeftPosition: (val: (val: number) => number) => void;
}
const XAxis = ({ leftPosition, setLeftPosition }: IProps) => {
  const { kind } = useNumbersLineContext();
  const [startX, setStartX] = useState(0);
  const [isDrapping, setIsDrapping] = useState(false);

  const handleStartDrag = (e: any) => {
    setIsDrapping(true);
    setStartX(e.clientX);
  };

  const handleonDrag = (e: any) => {
    if (isDrapping) {
      const deltaX = e.clientX - startX;
      setLeftPosition((prevLeft: number) => Math.max(-window.innerWidth * 3.8, Math.min(0, prevLeft + deltaX)));
      setStartX(e.clientX);
    }
  };
  const handleStopDrag = () => {
    setIsDrapping(false);
  };

  return (
    <>
      {kind == LineRange.hundred ? (
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
