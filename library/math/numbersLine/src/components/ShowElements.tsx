import { IElement, TypesElement } from "../type/moveable";
import Jump from "./Jump";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useState } from "react";
import { IWindowSize } from "../type/elements";

const ShowElements = () => {
  const { windowSize, dragElements, setIdDraggElementClick } = useNumbersLineContext();
  const [windowResizing, setWindowResizing] = useState(false);
  const [prevWindowSize, setPrevWindowSize] = useState<IWindowSize>({ height: windowSize.height, width: windowSize.width });

  const updateTransform = (element: IElement, heightRelative: number, widthRelative: number) => {
    const originalString = element.transform;
    const matchX = originalString.match(/\((.*?)px/);
    const matchY = originalString.match(/,\s*(-?\d+\.?\d*)px\)/);
    if (!matchX || !matchY) return;
    const xPosition = parseFloat(matchX[1]);
    const xPositionString = matchX[0];
    const newXPosition = xPosition * widthRelative;
    const yPosition = parseFloat(matchY[1]);
    const yPositionString = matchY[0];
    const newYPosition = yPosition * heightRelative;
    const newXYPositionString = "(" + newXPosition.toFixed(2) + "px, " + newYPosition.toFixed(2) + "px)";
    const newTransform = element.transform.replace(xPositionString + yPositionString, newXYPositionString);
    element.transform = newTransform;
    const documentElement = document.getElementById(`dragElement-${element.id}`);
    if (!documentElement) return;
    documentElement.style.transform = newTransform;
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
      {element.type == TypesElement.jump && <Jump element={element} />}
    </div>
  ));
};
export default ShowElements;
