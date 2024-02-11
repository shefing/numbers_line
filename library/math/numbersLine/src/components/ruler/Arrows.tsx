import { calculatScreenWidth } from "../../lib/utils";
import leftArrowIcon from "/assets/icons/arrow-left.svg";
import rightArrowIcon from "/assets/icons/arrow-right.svg";
import { LineRange, RulerLenth } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";

interface IProps {
  leftPosition: number;
  setLeftPosition: (val: number) => void;
}

const Arrows = ({ leftPosition, setLeftPosition }: IProps) => {
  const { type, windowSize } = useNumbersLineContext();

  const updatePositionOnArrowClick = (direction: "left" | "right") => {
    const step = windowSize.width / RulerLenth.hundred;
    setLeftPosition(direction === "left" ? Math.min(0, leftPosition + step) : Math.max(calculatScreenWidth(windowSize.width), leftPosition - step));
  };

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
