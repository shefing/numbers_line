import { IElement } from "../type/moveable";
import Jump from "./Jump";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useState } from "react";
import { ActionTypes, IWindowSize } from "../type/elements";
import { Text } from "./Text";
import { calcXTransform, calcYTransform } from "../lib/utils";
import { useAction } from "../hooks/useAction";

const ShowElements = () => {
  const { windowSize, dragElements, setIdDraggElementClick } = useNumbersLineContext();
  const { updateDragElements } = useAction();
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

    const heightRelativeChange = windowSize.height / prevWindowSize.height;
    const widthRelativeChange = windowSize.width / prevWindowSize.width;
    dragElements.map((element: IElement) => {
      updateTransform(element, heightRelativeChange, widthRelativeChange);
    });
  }, [windowResizing]);

  return dragElements.map((element: IElement) => (
    <div key={element.id} id={element.id} onClick={() => setIdDraggElementClick(element.id)}>
      {(() => {
        switch (element.type) {
          case ActionTypes.jump:
            return <Jump element={element} />;
          case ActionTypes.text:
            return <Text element={element} />;
          default:
            return null;
        }
      })()}
    </div>
  ));
};
export default ShowElements;
