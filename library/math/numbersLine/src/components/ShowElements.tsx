import Jump from "./showElements/Jump";
import Text from "./showElements/Text";
import NaviKeni from "./showElements/NaviKeni";
import Writing from "./showElements/Writing";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useState } from "react";
import { ActionTypes } from "../type/toolbar";
import { useHelpers } from "../hooks/useHelpers";
import { IElement } from "../type/moveable";
import { useDraggableElementAction } from "@/hooks/useDraggableElementAction";
import { RulerPaddingSides } from "@/consts/elementConsts";
import { unitAmount } from "@/type/ruler";

const ShowElements = () => {
  const { windowSize, rulerType, unit, setUnit, dragElements, setIdDraggElementClick } = useNumbersLineContext();
  const { rulerWidth, unitsAmount, rulerPosition } = useHelpers();
  const { updateDragElements } = useDraggableElementAction();
  const [windowResizing, setWindowResizing] = useState(false);

  const updateTransform = (element: IElement) => {
    let translateX;
    if (unitsAmount() === unitAmount.twenty) {
      translateX = (element.xRatio * (windowSize.width - unit)) + 0.5 * unit;
    } else {
      translateX = (element.xRatio * (windowSize.width - 2 * RulerPaddingSides)) + RulerPaddingSides;
    }
    let translateY;
    if (element.yRatio < 0) { // Element is below the ruler
      translateY = (-1 * element.yRatio * (windowSize.height - rulerPosition())) + rulerPosition();
    } else {
      translateY = element.yRatio * rulerPosition();
    }
    const newTransform = `translate(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px)`;
    let documentElement = document.getElementById(`dragElement-${element.id}`);
    if (element.type == ActionTypes.text)
      documentElement = document.getElementById(`dragElement-keyboardCET-${element.id}`);
    if (!documentElement) return;
    documentElement.style.transform = newTransform;
    element.jump
      ? updateDragElements(element.id, { ...element, transform: newTransform, jump: { ...element.jump, width: unit * element.jump.value } })
      : updateDragElements(element.id, { ...element, transform: newTransform });
  };

  useEffect(() => {
    let timeout: any;
    const handleResizeStart = () => {
      clearTimeout(timeout);
      setWindowResizing(true);
    };

    const handleResizeEnd = () => {
      clearTimeout(timeout);
      setWindowResizing(false);
    };

    window.addEventListener("resize", handleResizeStart);
    window.addEventListener("resize", () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleResizeEnd, 200);
    });
    return () => {
      window.removeEventListener("resize", handleResizeStart);
      window.removeEventListener("resize", handleResizeEnd);
    };
  }, []);

  useEffect(() => {
    if (windowResizing) return;
    const newUnit = rulerWidth() / unitsAmount();
    if (newUnit == unit)
      dragElements.map((element: IElement) => updateTransform(element));
    setUnit(newUnit);

  }, [rulerType, windowResizing]);

  useEffect(() => {
    dragElements.map((element: IElement) => updateTransform(element));
  }, [unit]);

  return dragElements.map((element: IElement) => (
    <div key={element.id} id={element.id} onClick={() => setIdDraggElementClick(element.id)}>
      {(() => {
        switch (element.type) {
          case ActionTypes.jump:
            return <Jump element={element} />;
          case ActionTypes.text:
            return <Text element={element} />;
          case ActionTypes.naviAndKeni:
            return <NaviKeni element={element} />;
          case ActionTypes.writing:
            return <Writing element={element} />;
          default:
            return null;
        }
      })()}
    </div>
  ));
};
export default ShowElements;
