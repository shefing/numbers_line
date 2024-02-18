import { useNumbersLineContext } from "@/context/numbersLineContext";
import { IElement } from "../type/moveable";
import { v4 as uuidv4 } from "uuid";
import { RulerPadding } from "@/consts/elementConsts";
import { LineRange } from "@/type/ruler";
import { calculatScreenWidth } from "@/lib/utils";

export const useAction = () => {
  const {windowSize,typeRuler,leftPosition,setLeftPosition, dragElements, setDragElements, setIdDraggElementClick } = useNumbersLineContext();

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
      const endXPosition = xPosition + parseFloat(baseJump.style.width) * 2;
      const outOfRange = endXPosition-windowSize.width + RulerPadding;
      let newXPosition = xPosition + baseJump.clientWidth;

      if(!(outOfRange>0 && (typeRuler != LineRange.hundred || leftPosition-outOfRange<calculatScreenWidth(windowSize.width)))){
      const xPositionString = match[0];
      if(typeRuler == LineRange.hundred){
        setLeftPosition(leftPosition- outOfRange)
        newXPosition-=outOfRange;
      }
      const newXPositionString = "(" + (newXPosition) + "px";
      transform = baseJump.style.transform.replace(xPositionString, newXPositionString);
    
    const newElement = {
      ...element,
      id,
      transform: transform,
    };
    const newDragElements: IElement[] = [...dragElements, newElement];
    setDragElements(newDragElements);
    setIdDraggElementClick(id);
    
  }}
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