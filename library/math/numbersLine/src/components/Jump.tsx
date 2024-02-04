import jumpArrowPlus from "/assets/icons/jumpArrowPlus.svg";
import React, { useEffect, useState } from "react";
import { IElement } from "@/type/elements";
import { baseJumpClassName } from "@/styles/jump";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { LineRange, UnitLenth } from "@/type/Line";

interface IProps {
  element: IElement;
}

const Jump = ({ element }: IProps) => {
  const { windowWidth, type, dragElements, setDragElements, idDraggElementClick } = useNumbersLineContext();
  const [unit, setUnit] = useState(windowWidth / UnitLenth.eleven);
  const targetRef = React.useRef<any>(null);

  useEffect(() => {
    if (type == LineRange.ten || type == LineRange.hundredCircular) setUnit((windowWidth - 4 * 16) / UnitLenth.eleven);
    else setUnit((windowWidth - 4 * 16) / UnitLenth.twentyOne);
  }, [type, windowWidth]);

  const changeHidenumbers = () => {
    let newelements = dragElements.map((item: IElement) => (item.id === idDraggElementClick ? { ...item, hideNumber: !item.hideNumber } : item));
    setDragElements(newelements);
  };

  return (
    <>
      <div
        ref={targetRef}
        className={`absolute top-[35%] left-[50%] ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{ width: unit }}
      >
        <img src={jumpArrowPlus} alt="Menu Arrow" />
        <div className={baseJumpClassName}>
          <p className="cursor-pointer" onClick={() => changeHidenumbers()}>
            {element.hideNumber ? "?" : element.value}
          </p>
        </div>
      </div>
      {idDraggElementClick == element.id && <MoveableElement targetRef={targetRef} length={element.value} />}
    </>
  );
};

export default Jump;
