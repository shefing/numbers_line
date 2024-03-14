import { IElement } from "../type/moveable";
import Jump from "./Jump";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useState } from "react";
import { ActionTypes, IWindowSize } from "../type/elements";
import { Text } from "./Text";
import { calcXTransform, calcYTransform } from "../lib/utils";
import { useDraggableElementAction } from "../hooks/useDraggableElementAction";
import NaviKeni from "./NaviKeni";
import { useHelpers } from "../hooks/useHelpers";
import { LineRange, RulerLenth } from "../type/ruler";
import { Writing } from "./Writing";

const ShowElements = () => {
  const { windowSize, typeRuler, dragElements, setIdDraggElementClick } = useNumbersLineContext();
  const { calculatRulerWidth, calculatUnitsAmount } = useHelpers();
  const { updateDragElements } = useDraggableElementAction();
  const [unit, setUnit] = useState(calculatRulerWidth() / calculatUnitsAmount());
  const [windowResizing, setWindowResizing] = useState(false);
  const [prevWindowSize, setPrevWindowSize] = useState<IWindowSize>({ height: windowSize.height, width: windowSize.width });

  const updateTransform = (element: IElement, heightRelative: number, widthRelative: number) => {
    const xPosition = calcXTransform(element.transform);
    const newXPosition = xPosition * widthRelative;
    const yPosition = calcYTransform(element.transform);
    const newYPosition = yPosition * heightRelative;
    const newXYPositionString = "(" + newXPosition.toFixed(2) + "px, " + newYPosition.toFixed(2) + "px)";
    const newTransform = element.transform.replace("(" + xPosition + "px, " + yPosition + "px)", newXYPositionString);
    const documentElement = document.getElementById(`dragElement-${element.id}`);
    if (!documentElement) return;
    documentElement.style.transform = newTransform;
    updateDragElements(element.id, { ...element, transform: newTransform });
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
    typeRuler == LineRange.hundred ? setUnit(windowSize.width / RulerLenth.hundred) : setUnit(unitWidth);

    const heightRelativeChange = windowSize.height / prevWindowSize.height;
    const widthRelativeChange = windowSize.width / prevWindowSize.width;
    dragElements.map((element: IElement) => {
      updateTransform(element, heightRelativeChange, widthRelativeChange);
    });
  }, [typeRuler, windowResizing]);

  return dragElements.map((element: IElement, i) => (
    <div key={element.id} id={element.id} onClick={() => setIdDraggElementClick(element.id)} style={{ zIndex: i }}>
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
