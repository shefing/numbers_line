import React, { useEffect, useState } from "react";
import { IElement } from "../type/moveable";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { calculatUnitsAmount } from "../lib/utils";
import { LineRange, RulerLenth } from "../type/ruler";
import JumpArrow from "./JumpArrow";
import { useHelpers } from "../hooks/useHelpers";
import { baseJumpClassName } from "../styles/jump";
import { useAction } from "../hooks/useAction";

interface IProps {
  element: IElement;
}
const Jump = ({ element }: IProps) => {
  const { windowSize, typeRuler, idDraggElementClick } = useNumbersLineContext();
  const { calculatRulerWidth } = useHelpers();
  const { updateDragElements } = useAction();

  const jump = element.jump!;
  const [unit, setUnit] = useState(calculatRulerWidth() / calculatUnitsAmount(typeRuler));
  const [hideNumber, setHideNumber] = useState(true);
  const moveableRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rulerWidth = calculatRulerWidth() / calculatUnitsAmount(typeRuler);
    setUnit(rulerWidth);
    updateDragElements(element.id, { ...element, width: rulerWidth * jump.value });
    typeRuler == LineRange.hundred && setUnit(windowSize.width / RulerLenth.hundred);
  }, [typeRuler, windowSize]);

  return (
    <>
      <div
        ref={moveableRef}
        id={"dragElement-" + element.id}
        className={`flex absolute t-0 l-0 ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{
          width: unit * jump.value,
          flexDirection: jump.underRuler ? "column-reverse" : "column",
          transform: element.transform,
        }}
      >
        <JumpArrow underRuler={jump.underRuler} jumpWidth={element.width} />
        <div id="dragElement-jumpBase" className={`${baseJumpClassName} ${jump.underRuler ? " bg-[#F48460] mb-[1rem]" : " bg-[#009FDE] mt-[1rem]"}`}>
          <span id="dragElement-jumpLength" className="cursor-pointer" onClick={() => setHideNumber(!hideNumber)}>
            {hideNumber ? "?" : typeRuler != LineRange.hundredCircular ? jump.value : jump.value * 10}
          </span>
        </div>
      </div>
      {idDraggElementClick === element.id && (
        <div id={`dragElement-jumpBase-${jump.underRuler ? "under" : "on"}`}>
          <MoveableElement moveableRef={moveableRef} element={element} unit={unit} />
        </div>
      )}
    </>
  );
};
export default Jump;
