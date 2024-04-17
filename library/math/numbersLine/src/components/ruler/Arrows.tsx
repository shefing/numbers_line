import leftArrow from "/assets/icons/arrowLeft.svg";
import leftArrowDisable from "/assets/icons/arrowLeftDisable.svg";
import rightArrow from "/assets/icons/arrowRight.svg";
import rightArrowDisable from "/assets/icons/arrowRightDisable.svg";
import { LineRange, RulerLenth } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";
import { useHelpers } from "../../hooks/useHelpers";

const Arrows = () => {
  const { windowSize, rulerType, unit, leftPosition, setLeftPosition, dragElements, idDraggElementClick, setIdDraggElementClick } = useNumbersLineContext();
  const { calculatScreenWidth } = useHelpers();
  const [leftArrowIcon, setLeftArrowIcon] = useState(leftArrow);
  const [rightArrowIcon, setRightArrowIcon] = useState(rightArrow);
  const leftPositionRef = useRef(leftPosition);
  const intervalRef = useRef<number | null>(null); // Ref to hold the interval ID

  useEffect(() => {
    setLeftArrowIcon(!leftPosition ? leftArrowDisable : leftArrow);
    setRightArrowIcon(leftPosition == calculatScreenWidth() ? rightArrowDisable : rightArrow);

    dragElements.forEach((item) => {
      if (item.id != idDraggElementClick) {
        const element = document.getElementById(`dragElement-${item.id}`);
        const match = element?.style.transform.match(/\((.*?)px/);
        if (match && element) {
          const xPosition = parseFloat(match[1]);
          const xPositionString = match[0];
          const newXPosition = "(" + (xPosition + leftPosition - leftPositionRef.current) + "px";
          element.style.transform = element.style.transform.replace(xPositionString, newXPosition);
          item.transform = element.style.transform;
        }
      }
    });
    leftPositionRef.current = leftPosition;
  }, [leftPosition]);

  const updatePositionOnArrowClick = (direction: "left" | "right") => {
    setIdDraggElementClick("");
    const step = windowSize.width / RulerLenth.hundred;
    setLeftPosition((prev) => Math.round((direction === "left" ? Math.min(0, prev + step) : Math.max(calculatScreenWidth(), prev - step)) / unit) * unit);
  };

  const handleMouseDown = (direction: "left" | "right") => {
    // Start the interval when mouse is pressed down
    intervalRef.current = window.setInterval(() => {
      updatePositionOnArrowClick(direction);
    }, 300); // Interval duration (in milliseconds)
  };
  const handleMouseUp = () => {
    // Clear the interval when mouse is released
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="flex justify-between w-full ">
      {rulerType == LineRange.hundred && (
        <>
          <img
            src={leftArrowIcon}
            alt="Left Arrow"
            className={`m-5 cursor-pointer relative z-[999] ${!leftPosition && "pointer-events-none"}`}
            onClick={() => updatePositionOnArrowClick("left")}
            onMouseDown={() => handleMouseDown("left")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <img
            src={rightArrowIcon}
            alt="Right Arrow"
            className={`m-5 cursor-pointer relative z-[999] ${leftPosition == calculatScreenWidth() && "pointer-events-none"}`}
            onClick={() => updatePositionOnArrowClick("right")}
            onMouseDown={() => handleMouseDown("right")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </>
      )}
    </div>
  );
};
export default Arrows;
