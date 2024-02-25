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
    <svg id="dragElement-jumpArrow" className="w-full" style={{ height: jumpArrowHeight + "px", position: "relative" }}>
      <path
        d={
          underRuler
            ? `M6,${20 - matchingPixels / 3} Q${jumpWidth * 0.5},${jumpArrowHeight * 2 - 10} ${jumpWidth},0`
            : `M0,${jumpArrowHeight} Q${jumpWidth * 0.5},-${jumpArrowHeight - 10} ${jumpWidth - 6},${jumpArrowHeight - 20 + matchingPixels / 3}`
        }
        fill="none"
        stroke={underRuler ? "#F48460" : "#009FDE"}
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="15 15"
      />
      <svg style={{ overflow: "visible" }} x={`${underRuler ? -6 : jumpWidth + 6}`} y={`${underRuler ? 10 : 90}%`}>
        <polygon
          points="-20,0 0,10 -20,20 "
          transform={`rotate(${underRuler ? -100 - matchingPixels : 80 - matchingPixels})`}
          fill={underRuler ? "#F48460" : "#009FDE"}
          // stroke={underRuler ? "red0" : "white"}
          // stroke-width="3"
          // style={{
          //   vectorEffect: "non-scaling-stroke",
          //   strokeDasharray: "30, 0,40", // Adjust based on your requirement
          //   strokeDashoffset: "30", // Adjust based on your requirement
          // }}
        />
      </svg>
    </svg>
  );
};

export default JumpArrow;
