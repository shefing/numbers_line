import Jump from "./showElements/Jump";
import Text from "./showElements/Text";
import NaviKeni from "./showElements/NaviKeni";
import Writing from "./showElements/Writing";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useState } from "react";
import { ActionTypes, IWindowSize } from "../type/toolbar";
import { calcXTransform, calcYTransform } from "../lib/utils";
import { useDraggableElementAction } from "../hooks/useDraggableElementAction";
import { useHelpers } from "../hooks/useHelpers";
import { LineRange, RulerLenth } from "../type/ruler";
import { IElement } from "../type/moveable";

const ShowElements = () => {
  const { windowSize, rulerType, dragElements, setIdDraggElementClick } = useNumbersLineContext();
  const { calculatRulerWidth, calculatUnitsAmount } = useHelpers();
  const { updateDragElements } = useDraggableElementAction();
  const [unit, setUnit] = useState(calculatRulerWidth() / calculatUnitsAmount());
  const [windowResizing, setWindowResizing] = useState(false);
  const [prevWindowSize, setPrevWindowSize] = useState<IWindowSize>({ height: windowSize.height, width: windowSize.width });

  const updateTransform = (element: IElement) => {
    const xPosition = calcXTransform(element.transform);
    const newXPosition = (xPosition / prevWindowSize.width) * windowSize.width;
    const yPosition = calcYTransform(element.transform);
    const newYPosition = (yPosition / prevWindowSize.height) * windowSize.height;
    const newXYPositionString = "(" + newXPosition.toFixed(2) + "px, " + newYPosition.toFixed(2) + "px)";
    const newTransform = element.transform.replace("(" + xPosition + "px, " + yPosition + "px)", newXYPositionString);
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
    setPrevWindowSize({ height: windowSize.height, width: windowSize.width });
    const unitWidth = calculatRulerWidth() / calculatUnitsAmount();
    const newUnit = rulerType == LineRange.hundred ? windowSize.width / RulerLenth.hundred : unitWidth;
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
            return <Jump element={element} unit={unit} />;
          case ActionTypes.text:
            return <Text element={element} />;
          case ActionTypes.naviAndKeni:
            return <NaviKeni element={element} unit={unit} />;
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
