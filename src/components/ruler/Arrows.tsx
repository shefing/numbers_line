import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import rightArrowIcon from "../../assets/icons/arrow-right.svg";

interface IProps {
  leftPosition: number;
  setLeftPosition: (val: number) => void;
}

const Arrows = ({ leftPosition, setLeftPosition }: IProps) => {
  const handleArrowClick = (direction: "left" | "right") => {
    const step = window.innerWidth / 21;
    setLeftPosition(direction === "left" ? Math.min(0, leftPosition + step) : Math.max(-window.innerWidth * 3.8, leftPosition - step));
  };

  return (
    <div className="flex justify-between m-3 mb-6">
      <div className="m-2 cursor-pointer" onClick={() => handleArrowClick("left")}>
        <img src={leftArrowIcon} />
      </div>
      <div className="m-2 cursor-pointer" onClick={() => handleArrowClick("right")}>
        <img src={rightArrowIcon} />
      </div>
    </div>
  );
};
export default Arrows;
