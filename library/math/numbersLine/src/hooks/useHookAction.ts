import { useNumbersLineContext } from "@/context/numbersLineContext";
import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";

export const useAction = () => {
  const { dragElements, setDragElements, setIdDraggElementClick } = useNumbersLineContext();

  const deleteDragElement = (elementId: string) => {
    const newDragElements = dragElements.filter((element) => element.id !== elementId);
    setDragElements(newDragElements);
  };

  const duplicateDragElement = (elementId: string) => {
    const elementToDuplicate = dragElements.find((element) => element.id === elementId);
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: uuidv4(),
      };
      const newDragElements: IElement[] = dragElements ? [...dragElements, newElement] : [];
      setDragElements(newDragElements);
      setIdDraggElementClick("");
    }
  };

  return {
    deleteDragElement,
    duplicateDragElement,
  };
};
