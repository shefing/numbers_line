import { useNumbersLineContext } from "@/context/numbersLineContext";
import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";
import { RulerPadding } from "../consts/elementConsts";
import { LineRange } from "../type/ruler";

export const useAction = () => {
  const { windowSize, typeRuler, leftPosition, setLeftPosition, dragElements, setDragElements, setIdDraggElementClick } = useNumbersLineContext();

  const deleteDragElement = (elementId: string) => {
    const newDragElements = dragElements.filter((element) => element.id !== elementId);
    setDragElements(newDragElements);
  };

  const duplicateDragJump = async (element: IElement) => {
    const id = uuidv4();
    let transform = "";
    const baseJump = document.getElementById("dragElement-jump" + element.id);
    let matchX = baseJump?.style.transform.match(/\((.*?)px/);
    if (matchX && baseJump) {
      const xPosition = parseFloat(matchX[1]);
      const endXPosition = xPosition + parseFloat(baseJump.style.width) * 2;
      const outOfRange = endXPosition - windowSize.width + RulerPadding - 10;
      let newXPosition = xPosition + baseJump.clientWidth;
      const xPositionString = matchX[0];
      if (typeRuler == LineRange.hundred && outOfRange > 0) {
        setLeftPosition(leftPosition - outOfRange);
        newXPosition -= outOfRange;
      }
      const newXPositionString = "(" + newXPosition + "px";
      transform = baseJump.style.transform.replace(xPositionString, newXPositionString);
      const newElement = {
        ...element,
        id,
        transform: transform,
      };
      const newDragElements: IElement[] = [...dragElements, newElement];
      setDragElements(newDragElements);
      setIdDraggElementClick(id);
    }
  };

  const updateDragElements = (elementId: string, newElement: IElement) => {
    const newElements = dragElements.map((item: IElement) => (item.id === elementId ? newElement : item));
    setDragElements(newElements);
  };

  return {
    deleteDragElement,
    duplicateDragJump,
    updateDragElements,
  };
};
