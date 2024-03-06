import leftArrow from "/assets/icons/arrowLeft.svg";
import leftArrowDisable from "/assets/icons/arrowLeftDisable.svg";
import rightArrow from "/assets/icons/arrowRight.svg";
import rightArrowDisable from "/assets/icons/arrowRightDisable.svg";
import { LineRange, RulerLenth } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";
import { useHelpers } from "../../hooks/useHelpers";

const Arrows = () => {
  const { typeRuler, windowSize, leftPosition, setLeftPosition, dragElements, idDraggElementClick, setIdDraggElementClick } = useNumbersLineContext();
  const { calculatScreenWidth } = useHelpers();
  const [leftArrowIcon, setLeftArrowIcon] = useState(leftArrow);
  const [rightArrowIcon, setRightArrowIcon] = useState(rightArrow);
  const leftPositionRef = useRef(leftPosition);

  const updatePositionOnArrowClick = (direction: "left" | "right") => {
    setIdDraggElementClick("");
    const step = windowSize.width / RulerLenth.hundred;
    setLeftPosition(direction === "left" ? Math.min(0, leftPosition + step) : Math.max(calculatScreenWidth(), leftPosition - step));
  };

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

  return (
    <div className="flex justify-between w-full ">
      {typeRuler == LineRange.hundred && (
        <>
          <div className="m-5 cursor-pointer relative " onClick={() => updatePositionOnArrowClick("left")}>
            <img src={leftArrowIcon} alt="Left Arrow" />
          </div>
          <div className="m-5  cursor-pointer relative " onClick={() => updatePositionOnArrowClick("right")}>
            <img src={rightArrowIcon} alt="Right Arrow" />
          </div>
        </>
      )}
    </div>
  );
};
export default Arrows;
