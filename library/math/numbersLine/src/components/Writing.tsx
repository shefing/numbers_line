import { brushWidth } from "@/consts/elementConsts";
import { IElement } from "../type/moveable";

interface IProps {
  element: IElement;
}

const Writing = ({ element }: IProps) => {
  if (!element.writing) return null;

  const pathData = `M ${element.writing.points.map(({ x, y }) => `${x} ${y}`).join(" L ")}`;

  return (
    <div
      className="absolute bg-transparent pointer-events-none"
      style={{
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        <path d={pathData} strokeWidth={brushWidth} stroke={element.writing.color} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
export default Writing;
