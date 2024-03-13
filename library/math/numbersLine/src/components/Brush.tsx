import { ActionTypes, Colors } from "../type/elements";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";
import { brushWidth } from "../consts/elementConsts";
import { v4 as uuidv4 } from "uuid";
import { IElement, ILine } from "@/type/moveable";

const Brush = () => {
  const { windowSize, dragElements, setDragElements, color } = useNumbersLineContext();
  const [isDrawing, setIsDrawing] = useState(false);
  // State to store drawn lines
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
    ctx.strokeStyle = color.color;
    ctx.lineCap = "round";
    color.color == Colors.delete ? (ctx.globalCompositeOperation = "destination-out") : (ctx.globalCompositeOperation = "source-over");
    // Store the context reference in a ref
    contextRef.current = ctx;
  }, [windowSize, color]);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    // Check if context exists and drawing is allowed
    if (!contextRef.current || color.color === Colors.non) return;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    setLine({ color: color.color, points: [{ x: offsetX, y: offsetY }] });
    nativeEvent.preventDefault();
  };

  const drawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current || !isDrawing) return;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    if (color.color === Colors.delete) {
      const eraserPath = new Path2D();
      const eraserRadius = brushWidth; // Increase the eraser radius to cover a wider area
      contextRef.current.lineWidth = brushWidth / 2;
      contextRef.current.strokeStyle = "black"; // Use a solid color for the eraser
      contextRef.current.stroke();
      eraserPath.arc(offsetX, offsetY, eraserRadius, 0, 2 * Math.PI); // Center the eraser path around the cursor

      // Filter out the lines intersecting with the eraser path
      const updatedDragElements: IElement[] = dragElements.filter((element: IElement) => {
        if (element.type === ActionTypes.writing) {
          for (const point of element.writing!.points) {
            // Check if any point of the line falls within the expanded eraser path
            if (Math.sqrt((point.x - offsetX) ** 2 + (point.y - offsetY) ** 2) <= eraserRadius) {
              // If any point of the line is within the eraser path, exclude this line
              return false;
            }
          }
        }
        return true;
      });
      setDragElements(updatedDragElements);
    } else {
      setLine((prevLine) => {
        if (!prevLine) return null;
        return { ...prevLine, points: [...prevLine.points, { x: offsetX, y: offsetY }] };
      });
    }

    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);

    if (!line) return;

    let newElement: IElement = {
      id: uuidv4(),
      type: ActionTypes.writing,
      transform: "",
      width: 0,
      writing: line,
    };
    setDragElements([...dragElements, newElement]);
  };

  return (
    <canvas
      className="canvas-container absolute"
      ref={canvasRef}
      onMouseDown={color.color !== Colors.non ? startDrawing : () => {}}
      onMouseMove={color.color !== Colors.non ? drawing : () => {}}
      onMouseUp={color.color !== Colors.non ? stopDrawing : () => {}}
      onMouseOut={color.color !== Colors.non ? stopDrawing : () => {}}
      style={
        color.color !== Colors.non
          ? color.color == Colors.delete
            ? { cursor: "cell", zIndex: dragElements.length }
            : { cursor: "crosshair", zIndex: dragElements.length }
          : {}
      }
    ></canvas>
  );
};

export default Brush;
