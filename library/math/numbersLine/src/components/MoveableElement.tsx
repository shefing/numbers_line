import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnResize, OnResizeEnd } from "react-moveable";
import { IElement } from "../type/moveable";
import { calculatUnitsAmount } from "../lib/utils";
import { RulerMargin, RulerPadding, ToolbarHieght, buttonsWidth, jumpBaseHeight, jumpHeight } from "../consts/elementConsts";
import { calcJumpPosition } from "../lib/utils";
import { ButtonViewable } from "../consts/ButtonViewable";
import { useAction } from "../hooks/useAction";
import { useHelpers } from "../hooks/useHelpers";
import { ActionTypes } from "../type/elements";

interface IProps {
  moveableRef: any;
  element: IElement;
  unit?: number;
}

const MoveableElement = ({ moveableRef, element, unit }: IProps) => {
  const { windowSize, typeRuler, rulerPaddingSides, leftPosition } = useNumbersLineContext();
  const { deleteDragElement, duplicateDragJump, updateDragElements } = useAction();
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
    //locate the element exactly on the ruler lines
    const originalString = e.target.style.transform;
    const matchX = originalString.match(/\((.*?)px/);
    if (!matchX) return;
    const xPosition = parseFloat(matchX[1]);
    const xPositionString = matchX[0];
    const unitsAmount = calculatUnitsAmount(typeRuler);
    //explanation
    const sidesPixels = (unitsAmount / 2 - Math.round(xPosition - rulerPaddingSides) / unit!) / unitsAmount;
    const newXPosition = Math.round((xPosition - rulerPaddingSides) / unit!) * unit! + rulerPaddingSides + sidesPixels;
    const newXPositionString = "(" + newXPosition + "px";
    e.target.style.transform = e.target.style.transform.replace(xPositionString, newXPositionString);
  };

  const onDragEnd = (e: OnResizeEnd) => {
    if (!element?.jump) return;

    let isUnderRuler = element.jump?.underRuler;
    const matchY = e.target.style.transform.match(/,\s*(-?\d+\.?\d*)px\)/);
    if (!matchY) return;
    const yTransform = parseFloat(matchY[1]);
    const yTransformString = matchY[0];
    const elementPsition = calcJumpPosition(yTransform, element.jump.underRuler);
    const rulerPosition = windowSize.height * (1 - RulerMargin) - RulerPadding;

    // Change the position of the element relative to the integers, provided that the position is close to the axis.
    if (Math.abs(rulerPosition - elementPsition) < 50) updateXLocation(e);

    // Change the type of jump if its position has changed relative to the ruler.
    if (element.jump.underRuler != rulerPosition < elementPsition) {
      let newYPositionString = "";
      if (rulerPosition < elementPsition) {
        isUnderRuler = true;
        newYPositionString = ", " + Math.round(yTransform + jumpHeight - jumpBaseHeight) + "px)";
      } else {
        isUnderRuler = false;
        newYPositionString = ", " + Math.round(yTransform - jumpHeight + jumpBaseHeight) + "px)";
      }
      e.target.style.transform = e.target.style.transform.replace(yTransformString, newYPositionString);
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
    const newValue = Math.round(e.lastEvent.width / unit!);
    const newWidth = newValue * unit!;
    e.target.style.width = `${newWidth}px`;
    updateDragElements(element.id, { ...element, width: newWidth, jump: { ...element.jump, value: newValue } });

    const matchX = e.target.style.transform.match(/\((.*?)px/);
    if (matchX) {
      const xPosition = parseFloat(matchX[1]);
      const xXPositionString = matchX[0];
      //Change position when jump out of range.
      if (xPosition + newWidth > windowSize.width - rulerPaddingSides) {
        const range = xPosition + newWidth - windowSize.width + rulerPaddingSides;
        const newXTransform = "(" + (xPosition - range) + "px";
        e.target.style.transform = e.target.style.transform.replace(xXPositionString, newXTransform);
        updateDragElements(element.id, { ...element, transform: e.target.style.transform });
      }
      //Change position when jump reSize on the left.
      if (e.clientX < xPosition) {
        const range = e.lastEvent.width - newWidth;
        const newXTransform = "(" + (xPosition + range) + "px";
        e.target.style.transform = e.target.style.transform.replace(xXPositionString, newXTransform);
        updateDragElements(element.id, { ...element, transform: e.target.style.transform });
      }
    }
  };

  return (
    <Moveable
      target={moveableRef}
      ables={[ButtonViewable]}
      props={ableProps || false}
      draggable={true}
      onDrag={(e) => (e.target.style.transform = e.transform)}
      onDragEnd={(e) => onDragEnd(e)}
      resizable={element.jump}
      renderDirections={["w", "e"]}
      onResize={(e) => onResize(e)}
      onResizeEnd={(e) => onResizeEnd(e)}
      snappable={true}
      bounds={{
        left: rulerPaddingSides,
        top: ToolbarHieght + 32,
        right: rulerPaddingSides,
        bottom: !element.jump || element.jump.underRuler ? buttonsWidth : jumpHeight - jumpBaseHeight + buttonsWidth,
        position: "css",
      }}
    />
  );
};

export default MoveableElement;
