import { dragElementID, jumpArrowHeight } from "../consts/elementConsts";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useState } from "react";

interface IProps {
  underRuler: boolean;
  jumpWidth: number;
}
const JumpArrow = ({ underRuler, jumpWidth }: IProps) => {
  const { windowSize } = useNumbersLineContext();
  const [matchingPixels, setMatchingPixels] = useState(0);
  const [triangleRotation, setTriangleRotation] = useState(0); // Rotation angle for the triangle

  useEffect(() => {
    setMatchingPixels(Math.min(((180 - triangleRotation) / 180) * 20, 20));
    const slope = (jumpArrowHeight * 2 - 15) / (jumpWidth * 0.5);
    const angle = Math.atan(slope) * (180 / Math.PI);
    const perpendicularAngle = underRuler ? angle - 90 : angle + 90;
    setTriangleRotation(perpendicularAngle - 90);
  }, [jumpWidth, windowSize]);

  return (
    <svg id={`${dragElementID}-jumpArrow`} className=" w-full " style={{ height: jumpArrowHeight + "px" }}>
      <path
        d={
          underRuler
            ? `M6,${20 - matchingPixels} Q${jumpWidth * 0.5},${jumpArrowHeight * 2 - 15} ${jumpWidth},0`
            : `M0,${jumpArrowHeight} Q${jumpWidth * 0.5},-${jumpArrowHeight - 15} ${jumpWidth - 5 + matchingPixels},${jumpArrowHeight - 20 + matchingPixels}`
        }
        fill="none"
        stroke={underRuler ? "#F48460" : "#009FDE"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="15 15"
      />
      <svg className="overflow-visible" x={`${underRuler ? -6 : jumpWidth + 5}`} y={`${underRuler ? 10 : 95 - matchingPixels}%`}>
        <polygon points="-20,0 0,10 -20,20 " transform={`rotate(${triangleRotation})`} fill={underRuler ? "#F48460" : "#009FDE"} />
      </svg>
    </svg>
  );
};

export default JumpArrow;
