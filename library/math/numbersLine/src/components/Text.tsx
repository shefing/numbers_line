import { IElement } from "../type/moveable";
import { useRef, useState } from "react";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useAction } from "../hooks/useAction";
import { maxTextBoxSize, textBoxSize } from "../consts/elementConsts";
import { calcXTransform } from "../lib/utils";

interface IProps {
  element: IElement;
}

export const Text = ({ element }: IProps) => {
  const { windowSize, idDraggElementClick, setIdDraggElementClick } = useNumbersLineContext();
  const moveableRef = useRef<any>(null);
  const [size, setSize] = useState(textBoxSize);
  const { deleteDragElement, updateDragElements } = useAction();

  const updateValueAndSize = (e: any) => {
    setSize(e.target.value.length > textBoxSize ? (e.target.value.length > maxTextBoxSize ? maxTextBoxSize : e.target.value.length) : textBoxSize);
    setIdDraggElementClick("");
    const inputWidth = e.target.offsetWidth;
    const startPosition = calcXTransform(element.transform);
    const endPosition = startPosition + inputWidth;
    const outOfRange = windowSize.width - endPosition;
    if (outOfRange < 0) {
      const newStartPosition = startPosition + outOfRange;
      const newTransform = element.transform.replace("(" + startPosition, "(" + newStartPosition);
      updateDragElements(element.id, { ...element, transform: newTransform });
      e.target.style.transform = newTransform;
    }
  };

  const deleteIfEmpty = (e: { target: { value: string } }) => {
    !e.target.value.length && deleteDragElement(element.id);
  };
  return (
    <>
      <input
        ref={moveableRef}
        id={"dragElement-inputText"}
        type="text"
        size={size}
        onChange={updateValueAndSize}
        onBlur={deleteIfEmpty}
        className="flex absolute t-0 l-0 bg-transparent px-2 text-[26px] h-[50px] font-[Arial] focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-[#009FDE] "
        autoFocus
        style={{
          transform: element.transform,
        }}
      />
      {idDraggElementClick === element.id && (
        <div id="dragElement-text">
          <MoveableElement moveableRef={moveableRef} element={element} />
        </div>
      )}
    </>
  );
};
