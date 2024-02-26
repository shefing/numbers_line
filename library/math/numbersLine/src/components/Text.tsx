import { IElement } from "@/type/moveable";
import { useRef } from "react";
import MoveableElement from "./MoveableElement";

interface IProps {
  element: IElement;
}

export const Text = ({ element }: IProps) => {
  const moveableRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div style={{ transform: element.transform }} id={"dragElement-" + element.id} ref={moveableRef}>
        text text
      </div>{" "}
      <div id={`dragElement-text`}>
        <MoveableElement moveableRef={moveableRef} element={element} />
      </div>
    </>
  );
};
