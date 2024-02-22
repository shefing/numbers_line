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
    <svg id="dragElement-jumpArrow" className="w-full" style={{ height: jumpArrowHeight + "px" }}>
      <path
        d={
          underRuler
            ? `M0,5 Q${jumpWidth * 0.5},${jumpArrowHeight + 55} ${jumpWidth},0`
            : `M0,${jumpArrowHeight} Q${jumpWidth * 0.5},-55 ${jumpWidth},${jumpArrowHeight - 5}`
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
          transform={`rotate(${underRuler ? -105 - matchingPixels : 75 - matchingPixels})`}
          fill={underRuler ? "#F48460" : "#009FDE"}
          stroke={underRuler ? "#F48460" : "#009FDE"}
          stroke-width="1"
        />
      </svg>
    </svg>
  );
};

export default JumpArrow;
