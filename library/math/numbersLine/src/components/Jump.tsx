import jumpArrowPlus from "/assets/icons/jumpArrowPlus.png";
import jumpArrowMinus from "/assets/icons/jumpArrowMinus.png";
import React, { useEffect, useState } from "react";
import { IElement } from "../type/moveable";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { calculatRulerWidth, calculatUnitsAmount } from "../lib/utils";
import { RulerPadding, jumpArrowHeight } from "../consts/elementConsts";
import { MatchBaseJumpClassName, clacHeightStartPosition, clacWidthStartPosition } from "../lib/stylesUtils";

interface IProps {
  element: IElement;
}

const Jump = ({ element }: IProps) => {
  const { windowSize, type, dragElements, setDragElements, idDraggElementClick } = useNumbersLineContext();
  const [unit, setUnit] = useState(windowSize.width / calculatUnitsAmount(type));
  const [isJumpUnderRuler, setIsJumpUnderRuler] = useState(false);
  const moveableRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rulerWidth = calculatRulerWidth(windowSize.width, RulerPadding) / calculatUnitsAmount(type);
    setUnit(rulerWidth);
  }, [type, windowSize.width]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--margin-value", `${isJumpUnderRuler ? -50 : 28}px`);
  }, [isJumpUnderRuler]);

  const changeHidenumbers = () => {
    let newElements = dragElements.map((item: IElement) => (item.id === idDraggElementClick ? { ...item, hideNumber: !item.hideNumber } : item));
    setDragElements(newElements);
  };

  return (
    <>
      <div
        ref={moveableRef}
        id={"dragElement-jump" + element.id}
        className={`absolute ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{
          width: unit * element.value,
          display: "flex",
          flexDirection: isJumpUnderRuler ? "column-reverse" : "column",
          left: clacWidthStartPosition(2, windowSize.width, type) + "px",
          top: clacHeightStartPosition(4, windowSize.height) + "px",
        }}
      >
        <img
          id="dragElement-jumpArrow"
          style={{ height: jumpArrowHeight + "px" }}
          className="w-full"
          src={isJumpUnderRuler ? jumpArrowMinus : jumpArrowPlus}
          alt="Menu Arrow"
        />
        <div id="dragElement-jumpBase" className={MatchBaseJumpClassName(isJumpUnderRuler)}>
          <span id="dragElement-jumpLength" className="cursor-pointer" onClick={() => changeHidenumbers()}>
            {element.hideNumber ? "?" : element.value}
          </span>
        </div>
      </div>
      {idDraggElementClick == element.id && (
        <MoveableElement
          moveableRef={moveableRef}
          element={element}
          unit={unit}
          isJumpUnderRuler={isJumpUnderRuler}
          setIsJumpUnderRuler={setIsJumpUnderRuler}
        />
      )}
    </>
  );
};

export default Jump;
