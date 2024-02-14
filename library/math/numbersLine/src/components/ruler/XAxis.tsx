import { useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/ruler";
import Numbers from "./Numbers";

const XAxis = () => {
  const { type, setLeftPositionValid } = useNumbersLineContext();
  const [startX, setStartX] = useState(0);
  const [isDragging, setisDragging] = useState(false);

  const handleStartDrag = (e: any) => {
    setisDragging(true);
    setStartX(e.clientX);
  };

  const handleonDrag = (e: any) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setLeftPositionValid(deltaX);
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
          <Numbers />
        </div>
      ) : (
        <Numbers />
      )}
    </>
  );
};

export default XAxis;
