import { useNumbersLineContext } from "@/context/numbersLineContext";
import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";
import { LineRange } from "../type/ruler";
import { ActionTypes, NaviKeniIconsTypes } from "../type/elements";
import {
  buttonsDraggElementWidth,
  duplicateElementStepSpace,
  jumpBaseHeight,
  jumpHeight,
  keniFoot,
  keniHeight,
  keniWidth,
  naviFoot,
  naviHeight,
  naviWidth,
  textBoxWidth,
} from "../consts/elementConsts";
import { calcXTransform } from "../lib/utils";
import { useHelpers } from "./useHelpers";

export const useDraggableElementAction = () => {
  const { windowSize, typeRuler, rulerPaddingSides, setLeftPosition, dragElements, setDragElements, setIdDraggElementClick, duplicateElementSpace, setDuplicateElementSpace } =
    useNumbersLineContext();
  const { calculatRulerWidth, calculatUnitsAmount } = useHelpers();

  const addDraggableElement = (typeAction: ActionTypes, type?: NaviKeniIconsTypes) => {
    const elementWidth = typeAction == ActionTypes.jump || ActionTypes.naviAndKeni ? calculatRulerWidth() / calculatUnitsAmount() : textBoxWidth;
    const xTranslate = (windowSize.width - elementWidth) / 2 + duplicateElementSpace;
    const yTranslate = windowSize.height / 4 + duplicateElementSpace;

    let newElement: IElement = {
      id: uuidv4(),
      type: typeAction,
      transform: `translate(${xTranslate}px, ${yTranslate}px)`,
    };

    if (typeAction === ActionTypes.jump) {
      newElement.jump = { value: 1, underRuler: false, width: elementWidth };
    }
    if (typeAction === ActionTypes.naviAndKeni) {
      if (type)
        newElement.icons = {
          type,
          widthRelatively: type == NaviKeniIconsTypes.navi ? naviWidth : keniWidth,
          heightRelativelyWidth: type == NaviKeniIconsTypes.navi ? naviHeight : keniHeight,
          footWidthRelatively: type == NaviKeniIconsTypes.navi ? naviFoot : keniFoot,
        };
    }
    setDragElements([...dragElements, newElement]);
    setDuplicateElementSpace((prevPixels) => prevPixels + duplicateElementStepSpace);
    const outOfRange =
      xTranslate > windowSize.width - windowSize.width / calculatUnitsAmount() - rulerPaddingSides ||
      yTranslate > windowSize.height - (jumpHeight + jumpBaseHeight + buttonsDraggElementWidth + duplicateElementStepSpace);

    outOfRange && setDuplicateElementSpace(0);
  };

  const deleteDragElement = (elementId: string) => {
    const newDragElements = dragElements.filter((element) => element.id !== elementId);
    setDragElements(newDragElements);
  };

  const duplicateDragJump = (element: IElement, unit: number) => {
    const elementWidth = unit * element.jump!.value;
    const id = uuidv4();
    let newTransform = "";
    const startPosition = calcXTransform(element.transform);
    const endNewJumpPosition = startPosition + elementWidth * 2;
    const outOfRange = element.jump?.underRuler ? startPosition - elementWidth : endNewJumpPosition - windowSize.width + rulerPaddingSides - 10;
    let newPosition = element.jump?.underRuler ? startPosition - elementWidth : startPosition + elementWidth;
    if (typeRuler == LineRange.hundred && ((!element.jump?.underRuler && outOfRange > 0) || (element.jump?.underRuler && outOfRange < 0))) {
      setLeftPosition((prevLeft: number) => prevLeft - outOfRange);

      newPosition -= outOfRange;
    }
    newTransform = element.transform.replace("(" + startPosition, "(" + newPosition);
    const newElement = {
      ...element,
      id,
      transform: newTransform,
    };
    setDragElements([...dragElements, newElement]);
    setIdDraggElementClick(id);
  };

  const updateDragElementsLayers = (elementId: string, newElement: IElement) => {
    const dragElementsWithoutNewElement = dragElements.filter((item: IElement) => item.id != elementId);
    const newElements = [...dragElementsWithoutNewElement, newElement];
    setDragElements(newElements);
  };

  const updateDragElements = (elementId: string, newElement: IElement) => {
    const newElements = dragElements.map((item: IElement) => (item.id === elementId ? newElement : item));
    setDragElements(newElements);
  };

  return {
    addDraggableElement,
    deleteDragElement,
    duplicateDragJump,
    updateDragElementsLayers,
    updateDragElements,
  };
};
