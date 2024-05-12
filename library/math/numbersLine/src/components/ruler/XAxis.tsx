import { useEffect, useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/ruler";
import { useHelpers } from "../../hooks/useHelpers";
import { ruleHeight } from "../../consts/elementConsts";
import Numbers from "./Numbers";

const XAxis = () => {
  const { windowSize, rulerType, unit, leftPosition, setLeftPosition, setIdDraggElementClick } = useNumbersLineContext();
  const { calculatScreenWidth } = useHelpers();

  const [startX, setStartX] = useState(-1);
  const [startLeftPosition, setStartLeftPosition] = useState(leftPosition);
  const [prevWindowSize, setPrevWindowSize] = useState(windowSize.width);

  useEffect(() => {
    const newLeftPosition = (windowSize.width / prevWindowSize) * leftPosition;
    setLeftPosition(Math.round(newLeftPosition / unit) * unit);
    setPrevWindowSize(windowSize.width);
  }, [windowSize]);

  useEffect(() => {
    if (startX > 0) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onStopDrag);
    } else {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onStopDrag);
    }
  }, [startX]);

  const onDrag = (e: any) => {
    if (startX > 0) {
      const deltaX = e.clientX - startX;
      setLeftPosition(Math.max(calculatScreenWidth(), Math.min(0, startLeftPosition + deltaX)));
    }
  };

  const onStopDrag = () => {
    setLeftPosition((preLeftPosition) => Math.round(preLeftPosition / unit) * unit);
    setStartX(-1);
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", onStopDrag);
  };

  return (
    <div
      className={rulerType == LineRange.hundred ? `cursor-move  w-full` : ""}
      onMouseDown={
        rulerType == LineRange.hundred
          ? (e) => {
              setStartLeftPosition(leftPosition);
              setStartX(e.clientX);
              setIdDraggElementClick("");
            }
          : () => {}
      }
      style={{ height: ruleHeight + "px" }}
    >
      <Numbers />
    </div>
  );
};
export default XAxis;
