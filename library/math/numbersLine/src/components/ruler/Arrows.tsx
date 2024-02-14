import { calculatScreenWidth } from "../../lib/utils";
import leftArrow from "/assets/icons/arrowLeft.svg";
import leftArrowDisable from "/assets/icons/arrowLeftDisable.svg";
import rightArrow from "/assets/icons/arrowRight.svg";
import rightArrowDisable from "/assets/icons/arrowRightDisable.svg";
import { LineRange, RulerLenth } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";

const Arrows = () => {
  const { type, windowSize, leftPosition, setLeftPosition, dragElements, idDraggElementClick } = useNumbersLineContext();
  const [leftArrowIcon, setLeftArrowIcon] = useState(leftArrow);
  const [rightArrowIcon, setRightArrowIcon] = useState(rightArrow);
  const leftPositionRef = useRef(leftPosition);

  const updatePositionOnArrowClick = (direction: "left" | "right") => {
    const step = windowSize.width / RulerLenth.hundred;
    setLeftPosition(direction === "left" ? Math.min(0, leftPosition + step) : Math.max(calculatScreenWidth(windowSize.width), leftPosition - step));
  };

  useEffect(() => {
    setLeftArrowIcon(leftPosition == 0 ? leftArrowDisable : leftArrow);
    setRightArrowIcon(leftPosition == calculatScreenWidth(windowSize.width) ? rightArrowDisable : rightArrow);

    dragElements.forEach((item) => {
      if (item.id != idDraggElementClick) {
        const element = document.getElementById("dragElement-jump" + item.id.toString());
        let match = element?.style.transform.match(/\((.*?)px/);
        if (match && element) {
          const xPosition = parseFloat(match[1]);
          const xPositionString = match[0];
          const newxPosition = "(" + (xPosition + leftPosition - leftPositionRef.current).toString() + "px";
          element.style.transform = element.style.transform.replace(xPositionString, newxPosition);
        }
      }
    });
    leftPositionRef.current = leftPosition;
  }, [leftPosition]);

  return (
    <div className="flex justify-between m-3 mb-6">
      {type == LineRange.hundred && (
        <>
          <div className="m-2 cursor-pointer" onClick={() => updatePositionOnArrowClick("left")}>
            <img src={leftArrowIcon} alt="Left Arrow" />
          </div>
          <div className="m-2 cursor-pointer" onClick={() => updatePositionOnArrowClick("right")}>
            <img src={rightArrowIcon} alt="Right Arrow" />
          </div>
        </>
      )}
    </div>
  );
};
export default Arrows;
