import { calculationWidthScreen } from "@/lib/utils";
import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import rightArrowIcon from "../../assets/icons/arrow-right.svg";
import { RulerLenth } from "@/type/Line";

interface IProps {
  windowWidth: number;
  leftPosition: number;
  setLeftPosition: (val: number) => void;
}

const Arrows = ({ windowWidth, leftPosition, setLeftPosition }: IProps) => {
  const handleArrowClick = (direction: "left" | "right") => {
    const step = windowWidth / RulerLenth.hundred;
    setLeftPosition(direction === "left" ? Math.min(0, leftPosition + step) : Math.max(calculationWidthScreen(windowWidth), leftPosition - step));
  };

  return (
    <div className="flex justify-between m-3 mb-6">
      <div className="m-2 cursor-pointer" onClick={() => handleArrowClick("left")}>
        <img src={leftArrowIcon} alt="Left Arrow" />
      </div>
      <div className="m-2 cursor-pointer" onClick={() => handleArrowClick("right")}>
        <img src={rightArrowIcon} alt="Right Arrow" />
      </div>
    </div>
  );
};
export default Arrows;
