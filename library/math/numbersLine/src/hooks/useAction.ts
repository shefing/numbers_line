import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";

export const deleteDragElement = (elementId:string, dragElements:IElement[] ):IElement[] => {
  const newDragElements = dragElements.filter(element => element.id !== elementId)
  return newDragElements
};

export const duplicateDragElement = (elementId: string, dragElements:IElement[]):IElement[] => {
  const elementToDuplicate = dragElements.find((element) => element.id === elementId);
  if (elementToDuplicate) {
    const newElement = {
      ...elementToDuplicate,
      id: uuidv4(),
    };
  const newDragElements: IElement[] = dragElements?[...dragElements, newElement]:[];

    return newDragElements;
  }
  return dragElements;
};

