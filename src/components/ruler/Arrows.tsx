import leftArrowIcon from "../../img/Group 1299.svg";
import rightArrowIcon from "../../img/Group 1300.svg";

interface IProps {
  startIndex: number;
  setStartIndex: (val: number) => void;
}
const Arrows = ({ startIndex, setStartIndex }: IProps) => {
  const handleArrowClick = (direction: "left" | "right") => {
    const step = 1;
    if (direction === "left") {
      setStartIndex(Math.max(0, startIndex - step));
    } else {
      setStartIndex(Math.min(80, startIndex + step));
    }
  };

  return (
    <div className="flex justify-between m-3 mb-6">
      <div className="ext-xl m-2 cursor-pointer text-blue-500" onClick={() => handleArrowClick("left")}>
        <img src={leftArrowIcon} alt="Left Arrow" />
      </div>
      <div className="text-xl m-2 cursor-pointer text-blue-500" onClick={() => handleArrowClick("right")}>
        <img src={rightArrowIcon} alt="Left Arrow" />
      </div>
    </div>
  );
};
export default Arrows;
