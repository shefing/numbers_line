import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useNumbersLineContext } from "../context/numbersLineContext";

const Brush = () => {
  const { windowSize, color } = useNumbersLineContext();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false); // State to track erase mode
  let brush: any;

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: color !== "" && !isErasing, // Enable drawing mode only if color is selected and erase mode is not active
    });
    canvas.freeDrawingBrush.width = 10;
    canvas.freeDrawingBrush.color = color;
    brush = canvas.freeDrawingBrush;

    return () => {
      // canvas.dispose();
    };
  }, [color, isErasing]);

  const handleMouseDown = () => {
    setIsDrawing(true);
  };
  const handleMouseMove = () => {
    if (!isDrawing) return;
    // If erase mode is active, remove the existing strokes at the mouse pointer
    const canvas: any = canvasRef.current;
    if (isErasing && canvas) {
      const pointer = canvas.getPointer(canvasRef.current);
      canvas.getObjects().forEach((obj: any) => {
        if (obj.containsPoint(pointer)) {
          canvas.remove(obj);
        }
      });
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const toggleEraseMode = () => {
    setIsErasing((prev) => !prev); // Toggle erase mode
  };
  return (
    <div>
      <canvas ref={canvasRef} width={windowSize.width} height={100} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
      <button onClick={toggleEraseMode}>Toggle Erase Mode</button> {/* Button to toggle erase mode */}
    </div>
  );
};

export default Brush;
