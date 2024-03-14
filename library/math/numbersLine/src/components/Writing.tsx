import { brushWidth } from "@/consts/elementConsts";
import { IElement } from "../type/moveable";

interface IProps {
  element: IElement;
}

export const Writing = ({ element }: IProps) => {
  if (!element.writing) return null; // Return null instead of an empty div if no writing element

  const pathData = `M ${element.writing.points.map(({ x, y }) => `${x} ${y}`).join(" L ")}`;

  return (
    <svg className="absolute" style={{ left: 0, top: 0, width: "100%", height: "100%" }} viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}>
      <path d={pathData} strokeWidth={brushWidth} stroke={element.writing.color} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
