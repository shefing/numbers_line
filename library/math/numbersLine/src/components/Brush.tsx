import { ActionTypes, Colors } from "../type/toolbar-Menu";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";
import { brushWidth, cursorColors, drawSpace } from "../consts/elementConsts";
import { v4 as uuidv4 } from "uuid";
import { IElement, ILine } from "../type/moveable";

const Brush = () => {
  const { windowSize, dragElements, setDragElements, color, zIndexCounter, setZIndexCounter } = useNumbersLineContext();
  const [isDrawing, setIsDrawing] = useState(false);
  const [line, setLine] = useState<ILine | null>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    // Initialize canvas and context
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = color.url;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    color.url == Colors.delete && (ctx.globalCompositeOperation = "destination-out");
    contextRef.current = ctx;
  }, [windowSize, color, dragElements]);

  const deleteLine = (offsetX: number, offsetY: number) => {
    const eraserPath = new Path2D();
    contextRef.current!.lineWidth = brushWidth;
    contextRef.current!.stroke();
    eraserPath.arc(offsetX, offsetY, brushWidth, 0, 2 * Math.PI);

    // Filter out the lines intersecting with the eraser path
    const updatedDragElements: IElement[] = dragElements.filter((element: IElement) => {
      if (element.type === ActionTypes.writing && element.writing) {
        for (const point of element.writing.points) {
          // Check if any point of the line falls within the expanded eraser path
          if (Math.sqrt((point.x - offsetX) ** 2 + (point.y - offsetY) ** 2) <= brushWidth) return false;
        }
      }
      return true;
    });
    setDragElements(updatedDragElements);
  };

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    // Check if context exists and drawing is allowed
    if (!contextRef.current || color.url === Colors.non) return;
    setLine({
      color: color.url,
      points: [
        { x: offsetX, y: offsetY + drawSpace },
        { x: offsetX + 0.1, y: offsetY + drawSpace + 0.1 },
      ],
    });
    setIsDrawing(true);
    if (color.url === Colors.delete) deleteLine(offsetX, offsetY + drawSpace);
    else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY + drawSpace);
      contextRef.current.lineTo(offsetX, offsetY + drawSpace);
      contextRef.current.stroke();
      nativeEvent.preventDefault();
    }
  };

  const drawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current || !isDrawing) return;
    contextRef.current.lineTo(offsetX, offsetY + drawSpace);
    contextRef.current.stroke();
    if (color.url === Colors.delete) deleteLine(offsetX, offsetY + drawSpace);
    else setLine((prevLine) => (prevLine ? { ...prevLine, points: [...prevLine.points, { x: offsetX, y: offsetY + drawSpace }] } : null));
    nativeEvent.preventDefault();
  };

  const stopDrawing = async () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    if (!line) return;
    let newElement: IElement = {
      id: uuidv4(),
      type: ActionTypes.writing,
      transform: "",
      writing: line,
      zIndex: zIndexCounter,
    };
    setDragElements([...dragElements, newElement]);
    setZIndexCounter((prev) => prev + 1);
  };

  return (
    color.url !== Colors.non && (
      <canvas
        className={`canvas-container absolute ${cursorColors[color.description]} `}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={drawing}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        style={{ zIndex: zIndexCounter }}
      />
    )
  );
};

export default Brush;
