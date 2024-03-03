import { IElement } from "@/type/moveable";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";

interface IProps {
  element: IElement;
}

export const Text = ({ element }: IProps) => {
  const { idDraggElementClick } = useNumbersLineContext();
  const moveableRef = useRef<HTMLDivElement>(null);
  const renderElement = <Input id={"dragElement-inputText"} element={element} />;

  return (
    <>
      <div
        ref={moveableRef}
        id={"dragElement-" + element.id}
        className={`flex absolute t-0 l-0 ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{
          transform: element.transform,
        }}
      >
        {renderElement}
      </div>
      {idDraggElementClick === element.id && (
        <div id="dragElement-text">
          <MoveableElement moveableRef={moveableRef} element={element} />
        </div>
      )}
    </>
  );
};
