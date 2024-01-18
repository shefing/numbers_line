import Arrows from "./Arrows";
import { useState } from "react";

interface IProps {
  labels: number[];
}
const XAxis = ({ labels }: IProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDragging) {
      const mouseX = e.clientX;
      const axisRect = e.currentTarget.getBoundingClientRect();
      const axisWidth = axisRect.width;
      const relativePosition = mouseX - axisRect.left;
      const labelIndex = Math.floor((relativePosition / axisWidth) * labels.length);
      setStartIndex(Math.min(80, Math.max(0, labelIndex)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <>
      {labels.length == 101 ? (
        <>
          <Arrows startIndex={startIndex} setStartIndex={setStartIndex} />
          <div
            className="stroke-3 stroke-var-black fixed left-0 right-0 flex justify-between border-t-2 border-gray-900 pt-0 mx-0 items-center pl-8 pr-8 "
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {labels.slice(startIndex, startIndex + 21).map((label) => (
              <div key={label} className={`text-xl text-color flex flex-col items-center ${label % 5 === 0 && "font-bold"}`}>
                <div className="h-3 border-l-2 border-gray-900 w-1366 flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="fixed left-0 right-0 flex justify-between border-t-2 border-gray-900 pt-0 mx-0 items-center pl-8 pr-8 ">
          {labels.map((label) => (
            <div key={label} className={`text-xl text-color flex flex-col items-center ${label % 5 === 0 && "font-bold"}`}>
              <div className="h-3 border-l-2 border-gray-900 w-1366 flex-shrink-0" />
              {label}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default XAxis;
