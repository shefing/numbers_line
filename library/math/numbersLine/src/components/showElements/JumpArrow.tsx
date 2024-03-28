import { IElement } from "@/type/moveable";
import { dragElementID, jumpArrowHeight } from "../../consts/elementConsts";
import { useEffect, useState } from "react";

interface IProps {
  element: IElement;
  jumpWidth: number;
}
const JumpArrow = ({ element, jumpWidth }: IProps) => {
  const underRuler = element.jump?.underRuler;
  const minus = element.jump?.minus;
  const [matchingSpace, setMatchingPixels] = useState(0);
  const [triangleRotation, setTriangleRotation] = useState(Math.atan((jumpArrowHeight * 2 - 15) / (jumpWidth * 0.5)) * (180 / Math.PI));

  useEffect(() => {
    setMatchingPixels(Math.min(((90 - triangleRotation) / 90) * 15, 15));
    const slope = (jumpArrowHeight * 2 - 15) / (jumpWidth * 0.5);
    const perpendicularAngle = Math.atan(slope) * (180 / Math.PI);
    setTriangleRotation(perpendicularAngle);
  }, [jumpWidth]);

  return (
    <svg
      id={`${dragElementID}-jumpArrow`}
      className={`w-full  ${minus == underRuler ? "transform scale-x-[1]" : "transform scale-x-[-1]"}`}
      style={{ height: jumpArrowHeight + "px" }}
    >
      <path
        d={
          underRuler
            ? `M${2 + matchingSpace / 3},${2 + matchingSpace / 3} Q${jumpWidth * 0.5},${jumpArrowHeight * 2 - 15} ${jumpWidth},0`
            : `M0,${jumpArrowHeight} Q${jumpWidth * 0.5},-${jumpArrowHeight - 15} ${jumpWidth - 3 - matchingSpace / 3},${jumpArrowHeight - 3 - matchingSpace / 3}`
        }
        fill="none"
        stroke={minus ? "#F48460" : "#009FDE"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="15 15"
        strokeDashoffset={20}
      />
      {/* <svg
        className="overflow-visible"
        x={`${underRuler ? jumpWidth - 15 + matchingSpace / 5 : jumpWidth + 7 - matchingSpace / 5}`}
        y={`${underRuler ? 5 - matchingSpace : jumpArrowHeight - 1 - matchingSpace}`}
      >
        <polygon points="-20,0 0,10 -20,20 " transform={`rotate(${underRuler ? -triangleRotation : triangleRotation})`} fill={minus ? "#F48460" : "#009FDE"} />
      </svg> */}
      <svg
        className="overflow-visible"
        x={`${underRuler ? -7 + matchingSpace / 5 : jumpWidth + 7 - matchingSpace / 5}`}
        y={`${underRuler ? 1 + matchingSpace : jumpArrowHeight - 1 - matchingSpace}`}
      >
        <polygon points="-20,0 0,10 -20,20 " transform={`rotate(${underRuler ? triangleRotation - 180 : triangleRotation})`} fill={minus ? "#F48460" : "#009FDE"} />
      </svg>
    </svg>
  );
};

export default JumpArrow;
//${underRuler ? -6 : jumpWidth + 5}
