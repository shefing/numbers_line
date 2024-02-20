import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnResize, OnResizeEnd } from "react-moveable";
import { IElement, TypesElement } from "../type/moveable";
import { calculatRulerWidth, calculatUnitsAmount } from "../lib/utils";
import { RulerMargin, RulerPadding, ToolbarHieght, jumpArrowHeight, jumpBaseHeight } from "../consts/elementConsts";
import { calcJumpPosition } from "../lib/stylesUtils";
import { ButtonViewable } from "../consts/ButtonViewable";
import { useAction } from "../hooks/useActionHook";

interface IProps {
  moveableRef: any;
  element: IElement;
  unit: number;
}

const MoveableElement = ({ moveableRef, element, unit }: IProps) => {
  const { windowSize, typeRuler, leftPosition } = useNumbersLineContext();
  const { deleteDragElement, duplicateDragJump, updateDragElements } = useAction();
  const ableProps = {
    ButtonViewable: true,
    onDeleteClick: () => deleteDragElement(element.id),
    copyViewAble: element.type === TypesElement.jump,
    onCopyClick: () => duplicateDragJump(element),
    underRuler: element.underRuler,
    typeRuler: typeRuler,
    leftPosition: leftPosition,
  };

  const updateXLocation = (e: any) => {
    const originalString = e.target.style.transform;
    const matchX = originalString.match(/\((.*?)px/);
    if (!matchX) return;
    const xPosition = parseFloat(matchX[1]);
    const xPositionString = matchX[0];
    const unitsAmount = calculatUnitsAmount(typeRuler);
    const sidesPixels = (unitsAmount / 2 - Math.round(xPosition - RulerPadding) / unit) / unitsAmount;
    const newXPosition = Math.round((xPosition - RulerPadding) / unit) * unit + RulerPadding + sidesPixels;
    const newXPositionString = "(" + newXPosition + "px";
    e.target.style.transform = e.target.style.transform.replace(xPositionString, newXPositionString);
  };

  const onDragEnd = (e: OnResizeEnd) => {
    //Change the color of the jump if dragged under the ruler
    let isUnderRuler = element.underRuler;
    const matchY = e.target.style.transform.match(/,\s*(-?\d+\.?\d*)px\)/);
    if (!matchY) return;
    const yTransform = parseFloat(matchY[1]);
    const yTransformString = matchY[0];
    const elementPsition = calcJumpPosition(yTransform, element.underRuler);
    const grassElement = document.getElementById("grass");
    const rulerPosition = grassElement ? windowSize.height - RulerMargin - grassElement.clientHeight : windowSize.height - RulerMargin;
    if (Math.abs(rulerPosition - elementPsition) < 50) {
      updateXLocation(e);
    }
    if (element.underRuler != rulerPosition < elementPsition) {
      let newYPositionString = "";
      if (rulerPosition < elementPsition) {
        isUnderRuler = true;
        newYPositionString = ", " + Math.round(yTransform + 80) + "px)";
      } else {
        isUnderRuler = false;
        newYPositionString = ", " + Math.round(yTransform - 80) + "px)";
      }
      e.target.style.transform = e.target.style.transform.replace(yTransformString, newYPositionString);
      const root = document.documentElement;
      root.style.setProperty("--margin-value", `${element.underRuler ? 30 : -50}px`);
    }

    updateDragElements(element.id, { ...element, transform: e.target.style.transform, underRuler: isUnderRuler });
  };
  const onResize = (e: OnResize) => {
    if (
      !(parseFloat(e.target.style.width) / unit < 1 && e.dist[0] < 0) &&
      !(parseFloat(e.target.style.width) > calculatRulerWidth(windowSize.width, RulerPadding) && e.dist[0] > 0)
    ) {
      e.target.style.width = `${e.width}px`;
      e.target.style.transform = e.drag.transform;
      const newValue = Math.round(parseFloat(e.target.style.width) / unit);
      newValue > element.value && updateDragElements(element.id, { ...element, value: newValue });
    }
  };
  const onResizeEnd = (e: OnResizeEnd) => {
    const newValue = Math.round(e.lastEvent.width / unit);
    updateDragElements(element.id, { ...element, value: newValue });
    const newWidth = newValue * unit;
    e.target.style.width = `${newWidth}px`;

    const matchX = e.target.style.transform.match(/\((.*?)px/);
    if (matchX) {
      const xPosition = parseFloat(matchX[1]);
      const xXPositionString = matchX[0];
      //Change position when jump out of bounds:
      if (xPosition + newWidth > windowSize.width - RulerPadding) {
        const range = xPosition + newWidth - windowSize.width + RulerPadding;
        const newXTransform = "(" + (xPosition - range) + "px";
        e.target.style.transform = e.target.style.transform.replace(xXPositionString, newXTransform);
        updateDragElements(element.id, { ...element, transform: e.target.style.transform });
      }
      //Change position when jump reSize on the left:
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
      resizable={true}
      renderDirections={["w", "e"]}
      onResize={(e) => onResize(e)}
      onResizeEnd={(e) => onResizeEnd(e)}
      snappable={true}
      bounds={{
        left: RulerPadding,
        top: ToolbarHieght + 32,
        right: RulerPadding,
        bottom: element.underRuler ? 0 : jumpArrowHeight + jumpBaseHeight,
        position: "css",
      }}
    />
  );
};

export default MoveableElement;
