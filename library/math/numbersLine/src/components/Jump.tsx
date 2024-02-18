import jumpArrowPlus from "/assets/icons/jumpArrowPlus.png";
import jumpArrowMinus from "/assets/icons/jumpArrowMinus.png";
import React, { useEffect, useState } from "react";
import { IElement } from "../type/moveable";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { calculatRulerWidth, calculatUnitsAmount } from "../lib/utils";
import { RulerPadding, jumpArrowHeight } from "../consts/elementConsts";
import { MatchBaseJumpClassName } from "../lib/stylesUtils";
import { LineRange } from "@/type/ruler";

interface IProps {
  element: IElement;
}

const Jump = ({ element }: IProps) => {
  const { windowSize, typeRuler, dragElements, setDragElements, idDraggElementClick } = useNumbersLineContext();
  const [unit, setUnit] = useState(windowSize.width / calculatUnitsAmount(typeRuler));
  const moveableRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rulerWidth = calculatRulerWidth(windowSize.width, RulerPadding) / calculatUnitsAmount(typeRuler);
    setUnit(rulerWidth);
  }, [typeRuler, windowSize.width]);

  useEffect(() => {
    dragElements.forEach((item) => {
      const element = document.getElementById("dragElement-jump" + item.id);
      if (element && item.transform != element.style.transform) {
        element.style.transform = item.transform;
        element.style.width = `${item.value * unit}px`;
      }
      const root = document.documentElement;
      root.style.setProperty("--margin-value", `${item.underRuler ? -50 : 28}px`);
    });
  }, [dragElements]);

  const changeHidenumbers = () => {
    let newElements = dragElements.map((item: IElement) => (item.id === idDraggElementClick ? { ...item, hideNumber: !item.hideNumber } : item));
    setDragElements(newElements);
  };

  return (
    <>
      <div
        ref={moveableRef}
        id={"dragElement-jump" + element.id}
        className={`absolute t-0 l-0 ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{
          width: unit * element.value,
          display: "flex",
          flexDirection: element.underRuler ? "column-reverse" : "column",
        }}
      >
        <img
          id="dragElement-jumpArrow"
          style={{ height: jumpArrowHeight + "px" }}
          className="w-full"
          src={element.underRuler ? jumpArrowMinus : jumpArrowPlus}
          alt="Menu Arrow"
        />
        <div id="dragElement-jumpBase" className={MatchBaseJumpClassName(element.underRuler)}>
          <span id="dragElement-jumpLength" className="cursor-pointer" onClick={() => changeHidenumbers()}>
            {element.hideNumber ? "?" : typeRuler != LineRange.hundredCircular ? element.value : element.value * 10}
          </span>
        </div>
      </div>
      {idDraggElementClick == element.id && <MoveableElement moveableRef={moveableRef} element={element} unit={unit} />}
    </>
  );
};

export default Jump;
