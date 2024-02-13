import { useNumbersLineContext } from "@/context/numbersLineContext";
import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";

export const useAction = () => {
  const { dragElements, setDragElements, setIdDraggElementClick } = useNumbersLineContext();

  const deleteDragElement = (elementId: string) => {
    const newDragElements = dragElements.filter((element) => element.id !== elementId);
    setDragElements(newDragElements);
  };

  const duplicateDragElement = (element: IElement) => {
      const newElement = {
        ...element,
        id: uuidv4(),
      };
      const newDragElements: IElement[] = [...dragElements, newElement];
      setDragElements(newDragElements);
      setIdDraggElementClick("");
  };

  return {
    deleteDragElement,
    duplicateDragElement,
  };
};