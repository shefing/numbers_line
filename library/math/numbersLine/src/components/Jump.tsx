import jumpArrowPlus from "/assets/icons/jumpArrowPlus.png";
import jumpArrowMinus from "/assets/icons/jumpArrowMinus.png";
import React, { useEffect, useState } from "react";
import { IElement } from "@/type/elements";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { calculatRulerWidth, calculatUnitsAmount } from "../lib/utils";
import { RulerPadding } from "../consts/elementConsts";
import { MatchBaseJumpClassName } from "@/lib/stylesUtils";

interface IProps {
  element: IElement;
}

const Jump = ({ element }: IProps) => {
  const { windowWidth, type, dragElements, setDragElements, idDraggElementClick } = useNumbersLineContext();
  const [unit, setUnit] = useState(windowWidth / calculatUnitsAmount(type));
  const [underRuler, setUnderRuler] = useState(false);
  const targetRef = React.useRef<any>(null);

  useEffect(() => {
    let rulerWidth = calculatRulerWidth(windowWidth, RulerPadding) / calculatUnitsAmount(type);
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
        id="dragElement-jump"
        className={`absolute top-[0px] left-[0px] ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{ width: unit * element.value, display: "flex", flexDirection: underRuler ? "column-reverse" : "column" }}
      >
        <img id="dragElement-jumpArrow" className="h-[4rem] w-full" src={underRuler ? jumpArrowMinus : jumpArrowPlus} alt="Menu Arrow" />
        <div id="dragElement-jumpBase" className={MatchBaseJumpClassName(underRuler)}>
          <text id="dragElement-jumpLength" className="cursor-pointer" onClick={() => changeHidenumbers()}>
            {element.hideNumber ? "?" : element.value}
          </text>
        </div>
      </div>
      {idDraggElementClick == element.id && (
        <MoveableElement targetRef={targetRef} element={element} unit={unit} underRuler={underRuler} setUnderRuler={setUnderRuler} />
      )}
    </>
  );
};

export default Jump;
