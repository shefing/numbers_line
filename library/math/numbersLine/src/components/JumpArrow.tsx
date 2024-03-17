import { jumpArrowHeight } from "../consts/elementConsts";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useState } from "react";

interface IProps {
  underRuler: boolean;
  jumpWidth: number;
}
const JumpArrow = ({ underRuler, jumpWidth }: IProps) => {
  const [matchingPixels, setMatchingPixels] = useState(0);
  const { windowSize } = useNumbersLineContext();

  useEffect(() => {
    setMatchingPixels(Math.min((jumpWidth / (windowSize.width / 2)) * 35, 45));
  }, [jumpWidth, windowSize]);

  return (
    <svg id="dragElement-jumpArrow" className=" w-full " style={{ height: jumpArrowHeight + "px" }}>
      <path
        d={
          underRuler
            ? `M6,${20 - matchingPixels / 3} Q${jumpWidth * 0.5},${jumpArrowHeight * 2 - 15} ${jumpWidth},0`
            : `M0,${jumpArrowHeight} Q${jumpWidth * 0.5},-${jumpArrowHeight - 15} ${jumpWidth - 6},${jumpArrowHeight - 20 + matchingPixels / 3}`
        }
        fill="none"
        stroke={underRuler ? "#F48460" : "#009FDE"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="15 15"
      />
      <svg className="overflow-visible" x={`${underRuler ? -6 : jumpWidth + 6}`} y={`${underRuler ? 10 : 90}%`}>
        <polygon points="-20,0 0,10 -20,20 " transform={`rotate(${underRuler ? -100 - matchingPixels : 80 - matchingPixels})`} fill={underRuler ? "#F48460" : "#009FDE"} />
      </svg>
    </svg>
  );
};

export default JumpArrow;
