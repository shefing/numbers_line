import { brushWidth } from "@/consts/elementConsts";
import { IElement } from "../type/moveable";

interface IProps {
  element: IElement;
}

export const Writing = ({ element }: IProps) => {
  if (!element.writing) return;
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
        <path
          d={`M ${element.writing.points.map(({ x, y }) => `${x} ${y}`).join(" L ")}`}
          strokeWidth={brushWidth}
          stroke={element.writing.color}
          fill="none"
        />
      </svg>
    </div>
  );
};
