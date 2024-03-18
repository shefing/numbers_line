import { IElement } from "../type/moveable";
import { useRef, useState } from "react";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useDraggableElementAction } from "../hooks/useDraggableElementAction";
import { maxTextBoxSize, textBoxSize } from "../consts/elementConsts";
import { calcXTransform } from "../lib/utils";

interface IProps {
  element: IElement;
}

const Text = ({ element }: IProps) => {
  const { windowSize, idDraggElementClick, setIdDraggElementClick } = useNumbersLineContext();
  const { deleteDragElement, updateDragElements, updateDragElementsLayers } = useDraggableElementAction();
  const [size, setSize] = useState(textBoxSize);
  const [dragging, setDragging] = useState(false);
  const moveableRef = useRef<any>(null);

  const updateValueAndSize = (e: any) => {
    updateDragElementsLayers(element);
    setIdDraggElementClick("");
    setSize(e.target.value.length > textBoxSize ? (e.target.value.length > maxTextBoxSize ? maxTextBoxSize : e.target.value.length) : textBoxSize);
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
        id={`dragElement-${element.id}`}
        type="text"
        size={size}
        onChange={updateValueAndSize}
        onBlur={deleteIfEmpty}
        className={`text-box ${dragging && "outline-none border-[1.5px] border-[#009FDE]"}`}
        autoFocus
        style={{
          transform: element.transform,
          zIndex: element.zIndex,
        }}
      />
      {idDraggElementClick == element.id && (
        <div id="dragElement-text">
          <MoveableElement moveableRef={moveableRef} element={element} unit={0} dragging={dragging} setDragging={setDragging} />
        </div>
      )}
    </>
  );
};
export default Text;
