import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnResize, OnResizeEnd } from "react-moveable";
import { IAbleProps, IElement } from "../type/moveable";
import { calculatRulerWidth, calculatUnitsAmount } from "../lib/utils";
import { RulerMargin, RulerPadding, ToolbarHieght, jumpArrowHeight, jumpBaseHeight } from "../consts/elementConsts";
import { calcJumpPosition } from "../lib/stylesUtils";
import { ButtonViewable } from "@/consts/ButtonViewable";
import { useAction } from "@/hooks/useActionHook";
import { LineRange } from "@/type/ruler";
import { useState } from "react";

interface IProps {
  moveableRef: any;
  element: IElement;
  unit: number;
}

const MoveableElement = ({ moveableRef, element, unit }: IProps) => {
  const { windowSize, typeRuler, setIdDraggElementClick } = useNumbersLineContext();
  const { deleteDragElement, duplicateDragJump, updateDragElements } = useAction();
  const [ableProps, setAbleProps] = useState<IAbleProps>({
    ButtonViewable: true,
    onDeleteClick: () => deleteDragElement(element.id),
    copyViewAble: true,
    onCopyClick: () => duplicateDragJump(element),
    copyApproval: true,
    underRuler: element.underRuler,
  });

  const updateXLocation = (e: any) => {
    debugger;
    const originalString = e.target.style.transform;
    const matchX = originalString.match(/\((.*?)px/);
    if (matchX) {
      const xPosition = parseFloat(matchX[1]);
      const xPositionString = matchX[0];
      const unitsAmount = calculatUnitsAmount(typeRuler);
      const sidesPixels = ((unitsAmount / 2 - Math.round(xPosition - RulerPadding) / unit) / unitsAmount) * 4;
      const newXPosition = Math.round((xPosition - RulerPadding) / unit) * unit + RulerPadding + sidesPixels;
      const newXPositionString = "(" + newXPosition + "px";

      e.target.style.transform = e.target.style.transform.replace(xPositionString, newXPositionString);
    }
  };
  const ChangeCopyDisable = (e: any) => {
    const matchX = e.target.style.transform.match(/\((.*?)px/);
    if (matchX) {
      const xPosition = matchX[1];
      const endXPosition = parseFloat(xPosition) + parseFloat(e.target.style.width) * 2;
      if (endXPosition > windowSize.width - RulerPadding && typeRuler != LineRange.hundred)
        setAbleProps((prevState) => ({ ...prevState, copyApproval: false }));
      else setAbleProps((prevState) => ({ ...prevState, copyApproval: true }));
    }
  };
  const onDragEnd = (e: OnResizeEnd) => {
    //Change the color of the jump if dragged under the ruler
    let isUnderRuler = element.underRuler;
    const matchY = e.target.style.transform.match(/,\s*(-?\d+\.?\d*)px\)/);
    if (matchY) {
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
      }
    }
    //change copy to disable if have no space
    ChangeCopyDisable(e);

    updateDragElements(element.id, { ...element, transform: e.target.style.transform, underRuler: isUnderRuler });
    setIdDraggElementClick("");
  };
  const onResize = (e: OnResize) => {
    if (
      !(parseFloat(e.target.style.width) / unit < 1 && e.dist[0] < 0) &&
      !(parseFloat(e.target.style.width) > calculatRulerWidth(windowSize.width, RulerPadding) && e.dist[0] > 0)
    ) {
      e.target.style.width = `${e.width}px`;
      e.target.style.transform = e.drag.transform;
    }
  };
  const onResizeEnd = (e: OnResizeEnd) => {
    const newValue = Math.round(e.lastEvent.width / unit);
    updateDragElements(element.id, { ...element, value: newValue });
    const newWidth = newValue * unit;
    e.target.style.width = `${newWidth}px`;

    //change position when jump reSize on the left:
    const match = e.target.style.transform.match(/\((.*?)px/);
    if (match) {
      const xPosition = parseFloat(match[1]);
      const xXPositionString = match[0];
      if (e.clientX < xPosition) {
        const range = e.lastEvent.width - newWidth;
        const newXTransform = "(" + (xPosition + range) + "px";
        e.target.style.transform = e.target.style.transform.replace(xXPositionString, newXTransform);
        updateDragElements(element.id, { ...element, transform: e.target.style.transform });
      }
    }
    //change copy to disable if have no space
    ChangeCopyDisable(e);
    setIdDraggElementClick("");
  };

  return (
    <Moveable
      target={moveableRef}
      ables={[ButtonViewable]}
      props={ableProps || false}
      draggable={true}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
      }}
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
