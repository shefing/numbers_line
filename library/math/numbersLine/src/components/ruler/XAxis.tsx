import { useEffect, useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange, RulerLenth } from "../../type/ruler";
import Numbers from "./Numbers";
import { useHelpers } from "../../hooks/useHelpers";
import { ruleHeight } from "../../consts/elementConsts";
const XAxis = () => {
  const { windowSize, rulerType, leftPosition, setLeftPosition, setIdDraggElementClick } = useNumbersLineContext();
  const { calculatScreenWidth } = useHelpers();

  const [startX, setStartX] = useState(0);
  const [isDragging, setisDragging] = useState(false);
  const [prevWindowSize, setPrevWindowSize] = useState(windowSize.width);

  useEffect(() => {
    const newLeftPosition = (windowSize.width / prevWindowSize) * leftPosition;
    setLeftPosition(newLeftPosition);
    setPrevWindowSize(windowSize.width);
  }, [windowSize]);

  const handleStartDrag = (e: any) => {
    setIdDraggElementClick("");
    setisDragging(true);
    setStartX(e.clientX);
  };

  const handleonDrag = (e: any) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setLeftPosition((prevLeft: number) => Math.max(calculatScreenWidth(), Math.min(0, prevLeft + deltaX)));
      setStartX(e.clientX);
    }
  };

  const handleStopDrag = () => {
    setisDragging(false);
    const unit = windowSize.width / RulerLenth.hundred;
    const rulerPosition = Math.round(leftPosition / unit) * unit;
    setLeftPosition(rulerPosition);
  };

  return (
    <div
      className={rulerType == LineRange.hundred ? `cursor-move  w-full` : ""}
      onMouseDown={rulerType == LineRange.hundred ? handleStartDrag : () => {}}
      onMouseMove={rulerType == LineRange.hundred ? handleonDrag : () => {}}
      onMouseUp={rulerType == LineRange.hundred ? handleStopDrag : () => {}}
      onMouseLeave={rulerType == LineRange.hundred ? handleStopDrag : () => {}}
      style={{ height: ruleHeight + "px" }}
    >
      <Numbers />
    </div>
  );
};

export default XAxis;
