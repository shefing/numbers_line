import { calculatScreenWidth } from "../../lib/utils";
import leftArrow from "/assets/icons/arrowLeft.svg";
import leftArrowDisable from "/assets/icons/arrowLeftDisable.svg";
import rightArrow from "/assets/icons/arrowRight.svg";
import rightArrowDisable from "/assets/icons/arrowRightDisable.svg";
import { LineRange, RulerLenth } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { useEffect, useState } from "react";

interface IProps {
  leftPosition: number;
  setLeftPosition: (val: number) => void;
}

const Arrows = ({ leftPosition, setLeftPosition }: IProps) => {
  const { type, windowSize } = useNumbersLineContext();
  const [leftArrowIcon, setLeftArrowIcon] = useState(leftArrow);
  const [rightArrowIcon, setRightArrowIcon] = useState(rightArrow);

  const updatePositionOnArrowClick = (direction: "left" | "right") => {
    const step = windowSize.width / RulerLenth.hundred;
    setLeftPosition(direction === "left" ? Math.min(0, leftPosition + step) : Math.max(calculatScreenWidth(windowSize.width), leftPosition - step));
  };

  useEffect(() => {
    const urlLeft = leftPosition == 0 ? leftArrowDisable : leftArrow;
    setLeftArrowIcon(urlLeft);
    const urlRight = leftPosition == calculatScreenWidth(windowSize.width) ? rightArrowDisable : rightArrow;
    setRightArrowIcon(urlRight);
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
