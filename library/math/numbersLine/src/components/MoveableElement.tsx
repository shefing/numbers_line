import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnDragEnd, OnResize, OnResizeEnd } from "react-moveable";
import { IElement } from "../type/moveable";
import { calcXTransform, calcYTransform, calculatUnitsAmount } from "../lib/utils";
import { RulerMargin, RulerPadding, ToolbarHeight, buttonsDraggElementWidth, jumpBaseHeight, jumpHeight } from "../consts/elementConsts";
import { calcJumpPosition } from "../lib/utils";
import { ButtonViewable } from "../consts/ButtonViewable";
import { useDraggableElementAction } from "../hooks/useDraggableElementAction";
import { useHelpers } from "../hooks/useHelpers";
import { ActionTypes } from "../type/elements";

interface IProps {
  moveableRef: any;
  element: IElement;
  unit?: number;
}

const MoveableElement = ({ moveableRef, element, unit }: IProps) => {
  const { windowSize, typeRuler, rulerPaddingSides, leftPosition } = useNumbersLineContext();
  const { deleteDragElement, duplicateDragJump, updateDragElements } = useDraggableElementAction();
  const { calculatRulerWidth, calculatScreenWidth } = useHelpers();

  const ableProps = {
    ButtonViewable: true,
    onDeleteClick: () => deleteDragElement(element.id),
    copyViewAble: element.type === ActionTypes.jump,
    onCopyClick: () => duplicateDragJump(element),
    underRuler: element.jump?.underRuler,
    typeRuler: typeRuler,
    leftPosition: leftPosition,
    rulerPaddingSides: rulerPaddingSides,
    calculatScreenWidth: () => calculatScreenWidth(),
  };

  const updateXLocation = (e: any) => {
    const xPosition = calcXTransform(e.target.style.transform);
    const unitsAmount = calculatUnitsAmount(typeRuler);
    // few pixels for the precise position of the element, the calculation is done relative to the position on the axis.
    const sidesPixels = (unitsAmount / 2 - Math.round(xPosition - rulerPaddingSides) / unit!) / unitsAmount;
    const newXPosition = Math.round((xPosition - rulerPaddingSides) / unit!) * unit! + rulerPaddingSides + sidesPixels;
    e.target.style.transform = e.target.style.transform.replace("(" + xPosition, "(" + newXPosition);
  };

  const onDragEnd = (e: OnDragEnd) => {
    if (!element?.jump) {
      updateDragElements(element.id, { ...element, transform: e.target.style.transform });
      return;
    }
    let isUnderRuler = element.jump.underRuler;
    const yTransform = calcYTransform(e.target.style.transform);
    const elementPsition = calcJumpPosition(yTransform, element.jump.underRuler);
    const rulerPosition = windowSize.height * (1 - RulerMargin) - RulerPadding;
    // Change the position of the element relative to the integers, provided that the position is close to the axis.
    if (Math.abs(rulerPosition - elementPsition) < 50) updateXLocation(e);

    // Change the type of jump if its position has changed relative to the ruler.
    if (element.jump.underRuler != rulerPosition < elementPsition) {
      let newYPositionString = "";
      if (rulerPosition < elementPsition) {
        isUnderRuler = true;
        newYPositionString = Math.round(yTransform + jumpHeight - jumpBaseHeight) + "px)";
      } else {
        isUnderRuler = false;
        newYPositionString = Math.round(yTransform - jumpHeight + jumpBaseHeight) + "px)";
      }
      e.target.style.transform = e.target.style.transform.replace(yTransform + "px)", newYPositionString);
    }

    updateDragElements(element.id, { ...element, transform: e.target.style.transform, jump: { ...element.jump, underRuler: isUnderRuler } });
  };

  const onResize = (e: OnResize) => {
    if (!(parseFloat(e.target.style.width) / unit! < 1 && e.dist[0] < 0) && !(parseFloat(e.target.style.width) > calculatRulerWidth() && e.dist[0] > 0)) {
      e.target.style.width = `${e.width}px`;
      updateDragElements(element.id, { ...element, width: e.width });
      e.target.style.transform = e.drag.transform;
    }
  };

  const onResizeEnd = (e: OnResizeEnd) => {
    if (!element.jump) return;
    // Changes the width of the jump according to the axis.
    const newValue = Math.round(e.lastEvent.width / unit!);
    const newWidth = newValue * unit!;
    e.target.style.width = `${newWidth}px`;

    const xPosition = calcXTransform(e.target.style.transform);
    //Change position when jump out of range.
    if (xPosition + newWidth > windowSize.width - rulerPaddingSides) {
      const range = xPosition + newWidth - windowSize.width + rulerPaddingSides;
      const newXPosition = "(" + (xPosition - range);
      e.target.style.transform = e.target.style.transform.replace("(" + xPosition, newXPosition);
    }
    //Change position when jump reSize on the left.
    let newTransform = e.target.style.transform;
    if (e.clientX < xPosition) {
      const range = e.lastEvent.width - newWidth;
      const newXPosition = "(" + (xPosition + range);
      newTransform = e.target.style.transform.replace("(" + xPosition, newXPosition);
      e.target.style.transform = newTransform;
    }

    updateDragElements(element.id, { ...element, width: newWidth, transform: newTransform, jump: { ...element.jump, value: newValue } });
  };

  return (
    <Moveable
      target={moveableRef}
      ables={[ButtonViewable]}
      props={ableProps || false}
      draggable={element.type == ActionTypes.text ? false : true}
      edgeDraggable={element.type == ActionTypes.text ? true : false}
      onDrag={(e) => (e.target.style.transform = e.transform)}
      onDragEnd={(e) => onDragEnd(e)}
      resizable={element.jump}
      renderDirections={["w", "e"]}
      onResize={(e) => onResize(e)}
      onResizeEnd={(e) => onResizeEnd(e)}
      snappable={true}
      bounds={{
        left: element.jump ? rulerPaddingSides : 1,
        top: ToolbarHeight + buttonsDraggElementWidth,
        right: element.jump ? rulerPaddingSides : 1,
        bottom: element.jump ? (element.jump.underRuler ? buttonsDraggElementWidth : jumpHeight - jumpBaseHeight + buttonsDraggElementWidth) : 1,
        position: "css",
      }}
    />
  );
};

export default MoveableElement;
