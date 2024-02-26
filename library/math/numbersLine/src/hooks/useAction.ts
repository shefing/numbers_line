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
    let transform = "";
    const baseJump = document.getElementById(`dragElement-${element.id}`);
    let matchX = baseJump?.style.transform.match(/\((.*?)px/);
    if (matchX && baseJump) {
      const xPosition = parseFloat(matchX[1]);
      const endXPosition = xPosition + parseFloat(baseJump.style.width) * 2;
      const outOfRange = endXPosition - windowSize.width + rulerPaddingSides - 10;
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

  const initialization = () => {
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
    initialization,
  };
};
