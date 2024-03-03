import { IElement } from "../type/moveable";
import { useRef } from "react";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { Input } from "./ui/input";

interface IProps {
  element: IElement;
}

export const Text = ({ element }: IProps) => {
  const { idDraggElementClick } = useNumbersLineContext();
  const moveableRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={moveableRef}
        id={"dragElement-" + element.id}
        className={`flex items-center justify-center absolute t-0 l-0 ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{
          transform: element.transform,
        }}
      >
        <Input id={"dragElement-inputText"} element={element} />
      </div>
      {idDraggElementClick === element.id && (
        <div id="dragElement-text">
          <MoveableElement moveableRef={moveableRef} element={element} />
        </div>
      )}
    </>
  );
};
