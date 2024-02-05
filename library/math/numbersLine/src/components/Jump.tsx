import jumpArrowPlus from "/assets/icons/jumpArrowPlus.png";
import React, { useEffect, useState } from "react";
import { IElement } from "@/type/elements";
import { baseJumpClassName } from "@/styles/jump";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { LineRange, UnitLenth } from "../type/Line";
import { calculatRulerWidth } from "../lib/utils";

interface IProps {
  element: IElement;
}

const Jump = ({ element }: IProps) => {
  const { windowWidth, type, dragElements, setDragElements, idDraggElementClick } = useNumbersLineContext();
  const [unit, setUnit] = useState(windowWidth / UnitLenth.ten);
  const targetRef = React.useRef<any>(null);

  useEffect(() => {
    let rulerWidth = calculatRulerWidth(windowWidth) / UnitLenth.twenty;
    if (type == LineRange.ten || type == LineRange.hundredCircular) rulerWidth = calculatRulerWidth(windowWidth) / UnitLenth.ten;
    setUnit(rulerWidth);
  }, [type, windowWidth]);

  const changeHidenumbers = () => {
    let newElements = dragElements.map((item: IElement) => (item.id === idDraggElementClick ? { ...item, hideNumber: !item.hideNumber } : item));
    setDragElements(newElements);
  };

  return (
    <>
      <div
        ref={targetRef}
        className={`dragElement absolute top-[35%] left-[50%]  ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{ width: unit * element.value }}
      >
        <img className="h-[4rem] w-full" src={jumpArrowPlus} alt="Menu Arrow" />
        <div className={baseJumpClassName}>
          <text className="cursor-pointer" onClick={() => changeHidenumbers()}>
            {element.hideNumber ? "?" : element.value}
          </text>
        </div>
      </div>
      {idDraggElementClick == element.id && <MoveableElement targetRef={targetRef} element={element} unit={unit} />}
    </>
  );
};

export default Jump;
