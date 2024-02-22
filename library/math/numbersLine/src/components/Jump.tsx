import React, { useEffect, useState } from "react";
import { IElement } from "../type/moveable";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { calculatRulerWidth, calculatUnitsAmount } from "../lib/utils";
import { MatchBaseJumpClassName } from "../lib/stylesUtils";
import { LineRange } from "@/type/ruler";
import JumpArrow from "./JumpArrow";

interface IProps {
  element: IElement;
}

const Jump = ({ element }: IProps) => {
  const { windowSize, typeRuler, idDraggElementClick } = useNumbersLineContext();
  const [unit, setUnit] = useState(calculatRulerWidth(windowSize.width, typeRuler) / calculatUnitsAmount(typeRuler));
  const [hideNumber, setHideNumber] = useState(true);
  const [jumpWidth, setJumpWidth] = useState(unit * element.value);
  const moveableRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rulerWidth = calculatRulerWidth(windowSize.width, typeRuler) / calculatUnitsAmount(typeRuler);
    setUnit(rulerWidth);
    setJumpWidth(rulerWidth * element.value);
  }, [typeRuler, windowSize]);

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
          transform: element.transform,
        }}
      >
        <JumpArrow underRuler={element.underRuler} jumpWidth={jumpWidth} />
        <div id="dragElement-jumpBase" className={MatchBaseJumpClassName(element.underRuler)}>
          <span id="dragElement-jumpLength" className="cursor-pointer" onClick={() => setHideNumber(!hideNumber)}>
            {hideNumber ? "?" : typeRuler != LineRange.hundredCircular ? element.value : element.value * 10}
          </span>
        </div>
      </div>
      {idDraggElementClick === element.id && <MoveableElement moveableRef={moveableRef} element={element} unit={unit} setJumpWidth={setJumpWidth} />}
    </>
  );
};

export default Jump;
