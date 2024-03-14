import { ActionTypes, Colors } from "../type/elements";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";
import { brushWidth } from "../consts/elementConsts";
import { v4 as uuidv4 } from "uuid";
import { IElement, ILine } from "../type/moveable";

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
    ctx.strokeStyle = color.url;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    color.url == Colors.delete ? (ctx.globalCompositeOperation = "destination-out") : (ctx.globalCompositeOperation = "source-over");
    // Store the context reference in a ref
    contextRef.current = ctx;
  }, [windowSize, color]);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    // Check if context exists and drawing is allowed
    if (!contextRef.current || color.url === Colors.non) return;
    setLine({
      color: color.url,
      points: [
        { x: offsetX, y: offsetY },
        { x: offsetX + 0.1, y: offsetY + 0.1 },
      ],
    });
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const drawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current || !isDrawing) return;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    if (color.url === Colors.delete) {
      const eraserPath = new Path2D();
      const eraserRadius = brushWidth; // Increase the eraser radius to cover a wider area
      contextRef.current.lineWidth = brushWidth;
      contextRef.current.stroke();
      eraserPath.arc(offsetX, offsetY, eraserRadius, 0, 2 * Math.PI); // Center the eraser path around the cursor

      // Filter out the lines intersecting with the eraser path
      const updatedDragElements: IElement[] = dragElements.filter((element: IElement) => {
        if (element.type === ActionTypes.writing && element.writing) {
          for (const point of element.writing.points) {
            // Check if any point of the line falls within the expanded eraser path
            if (Math.sqrt((point.x - offsetX) ** 2 + (point.y - offsetY) ** 2) <= eraserRadius) return false;
          }
        }
        return true;
      });
      setDragElements(updatedDragElements);
    } else {
      setLine((prevLine) => (prevLine ? { ...prevLine, points: [...prevLine.points, { x: offsetX, y: offsetY }] } : null));
    }
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
      width: 0,
      writing: line,
    };
    setDragElements([...dragElements, newElement]);
  };

  return (
    color.url !== Colors.non && (
      <canvas
        className="canvas-container absolute"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        style={color.url == Colors.delete ? { cursor: "cell", zIndex: dragElements.length } : { cursor: "crosshair", zIndex: dragElements.length }}
      ></canvas>
    )
  );
};

export default Brush;
