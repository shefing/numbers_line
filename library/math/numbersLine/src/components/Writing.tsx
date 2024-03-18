import { brushWidth } from "@/consts/elementConsts";
import { IElement } from "../type/moveable";

interface IProps {
  element: IElement;
}

const Writing = ({ element }: IProps) => {
  if (!element.writing) return null;

  const pathData = `M ${element.writing.points.map(({ x, y }) => `${x} ${y}`).join(" L ")}`;

  return (
    <div className="absolute t-0 l-0 w-[100%] h-[100%] bg-transparent bg-red pointer-events-none" onClick={() => {}} style={{ zIndex: element.zIndex }}>
      <svg className="absolute w-[100%] h-[100%]">
        <path d={pathData} strokeWidth={brushWidth} stroke={element.writing.color} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
export default Writing;
