import { useNumbersLineContext } from "@/context/numbersLineContext";
import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";

export const useAction = () => {
  const { dragElements, setDragElements, setIdDraggElementClick } = useNumbersLineContext();

  const deleteDragElement = (elementId: string) => {
    const newDragElements = dragElements.filter((element) => element.id !== elementId);
    setDragElements(newDragElements);
  };
  const duplicateDragJump = async (element: IElement) => {
    const id = uuidv4();
    let transform = "";
    const baseJump = document.getElementById("dragElement-jump" + element.id);
    let match = baseJump?.style.transform.match(/\((.*?)px/s);
    if (match && baseJump) {
      const xPosition = parseFloat(match[1]);
      const xPositionString = match[0];
      const newXPosition = "(" + (xPosition + baseJump.clientWidth) + "px";
      transform = baseJump.style.transform.replace(xPositionString, newXPosition);
    }
    const newElement = {
      ...element,
      id,
      transform: transform,
    };
    const newDragElements: IElement[] = [...dragElements, newElement];
    setDragElements(newDragElements);
    setIdDraggElementClick(id);
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