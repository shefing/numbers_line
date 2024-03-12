import { DrawSituation, WritingSituation } from "../type/elements";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";
import { brushWidth } from "../consts/elementConsts";

const Brush = () => {
  const { windowSize, color, drawSituation, setDrawSituation } = useNumbersLineContext();
  const [isDrawing, setIsDrawing] = useState(false);
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
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    // Store the context reference in a ref
    contextRef.current = ctx;
  }, [windowSize]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = brushWidth;
      ctx.lineCap = "round";
      // Set global composite operation for erasing
      color == WritingSituation.delete ? (ctx.globalCompositeOperation = "destination-out") : (ctx.globalCompositeOperation = "source-over");
    }
  }, [color]);

  // Effect to handle canvas clearing based on drawSituation
  useEffect(() => {
    if (drawSituation !== DrawSituation.clean || !contextRef.current || !canvasRef.current) return;
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawSituation(DrawSituation.empty);
  }, [drawSituation]);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    // Check if context exists and drawing is allowed
    if (!contextRef.current || color == WritingSituation.non) return;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const drawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current || !isDrawing) return;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
    setDrawSituation(DrawSituation.notEmpty);
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      className="canvas-container absolute"
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={drawing}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={color !== WritingSituation.non ? { cursor: "crosshair" } : {}}
    />
  );
};

export default Brush;
