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

const ShowElements = () => {
  const { windowSize, rulerType, unit, setUnit, dragElements, setIdDraggElementClick } = useNumbersLineContext();
  const { calculatRulerWidth, calculatUnitsAmount } = useHelpers();
  const { updateDragElements } = useDraggableElementAction();
  const [windowResizing, setWindowResizing] = useState(false);
  const updateTransform = (element: IElement) => {
    const newTransform = `translate(${(element.widthRatio * windowSize.width).toFixed(2)}px, ${(element.heightRatio * windowSize.height).toFixed(2)}px)`
    const documentElement = document.getElementById(`dragElement-${element.id}`);
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
    const newUnit = calculatRulerWidth() / calculatUnitsAmount();
    setUnit(newUnit);
  }, [rulerType, windowResizing]);

  useEffect(() => {
    dragElements.map((element: IElement) => element.type != ActionTypes.text && updateTransform(element));
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
