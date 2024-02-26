import { useNumbersLineContext } from "@/context/numbersLineContext";
import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";
import { LineRange, RulerLenth } from "../type/ruler";
import { TypeCover } from "../type/elements";
import { RulerPaddingSides } from "../consts/elementConsts";

export const useAction = () => {
  const {
    windowSize,
    typeRuler,
    setTypeRuler,
    typeRulerChange,
    rulerPaddingSides,
    setRulerPaddingSides,
    leftPosition,
    setLeftPosition,
    dragElements,
    setDragElements,
    setCoverSituation,
    setVisitableDisplayButton,
    setIdDraggElementClick,
  } = useNumbersLineContext();

  const deleteDragElement = (elementId: string) => {
    const newDragElements = dragElements.filter((element) => element.id !== elementId);
    setDragElements(newDragElements);
  };

  const duplicateDragJump = async (element: IElement) => {
    const id = uuidv4();
    let newTransform = "";
    let transform = element.transform.match(/\((.*?)px/);
    if (!transform) return;
    const startPosition = parseFloat(transform[1]);
    const endNewJumpPosition = startPosition + element.width * 2;
    const outOfRange = endNewJumpPosition - windowSize.width + rulerPaddingSides - 10;
    let newPosition = startPosition + element.width;
    const startPositionString = transform[0];
    if (typeRuler == LineRange.hundred && outOfRange > 0) {
      setLeftPosition(leftPosition - outOfRange);
      newPosition -= outOfRange;
    }
    const newXPositionString = "(" + newPosition + "px";
    newTransform = element.transform.replace(startPositionString, newXPositionString);
    const newElement = {
      ...element,
      id,
      transform: newTransform,
    };
    setDragElements([...dragElements, newElement]);
    setIdDraggElementClick(id);
  };

  const updateDragElements = (elementId: string, newElement: IElement) => {
    const newElements = dragElements.map((item: IElement) => (item.id === elementId ? newElement : item));
    setDragElements(newElements);
  };

  const restart = () => {
    setTypeRuler(typeRulerChange);
    typeRulerChange == LineRange.hundred ? setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2) : RulerPaddingSides;
    setDragElements([]);
    setCoverSituation(TypeCover.allDiscover);
    setVisitableDisplayButton(TypeCover.allDiscover);
    setLeftPosition(0);
  };

  return {
    deleteDragElement,
    duplicateDragJump,
    updateDragElements,
    restart,
  };
};
