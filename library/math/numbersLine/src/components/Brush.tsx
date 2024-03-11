import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useNumbersLineContext } from "../context/numbersLineContext";

const Brush = () => {
  const { windowSize, color } = useNumbersLineContext();
  const canvasRef = useRef(null);
  let isDrawing = false;
  let brush: any;

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
    });
    canvas.freeDrawingBrush.width = 10;
    canvas.freeDrawingBrush.color = color;
    brush = canvas.freeDrawingBrush;
    return () => {
      canvas.dispose(); // Clean up Fabric.js canvas when component unmounts
    };
  }, [color]);

  const handleMouseDown = () => {
    isDrawing = true;
  };

  const handleMouseMove = () => {
    if (!isDrawing) return;
    //   const pointer = canvasRef??canvasRef.current.getPointer(event.e);
    //   brush.onMouseDown(pointer);
  };

  const handleMouseUp = () => {
    isDrawing = false;
  };

  return (
    <>
      {color != "" && (
        <canvas ref={canvasRef} width={windowSize.width} height={100} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
      )}
    </>
  );
};

export default Brush;
