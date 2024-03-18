import React, { useEffect, useState } from "react";
import { IElement } from "../type/moveable";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { LineRange } from "../type/ruler";
import JumpArrow from "./JumpArrow";
import { baseJumpClassName } from "../styles/jump";
import { useDraggableElementAction } from "../hooks/useDraggableElementAction";

interface IProps {
  element: IElement;
  unit: number;
}
const Jump = ({ element, unit }: IProps) => {
  const { typeRuler, dragElements, idDraggElementClick } = useNumbersLineContext();
  const { updateDragElements } = useDraggableElementAction();
  const jump = element.jump!;
  const [hideNumber, setHideNumber] = useState(true);
  const [click, setClick] = useState(false);
  const moveableRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClick(idDraggElementClick === element.id);
  }, [idDraggElementClick]);

  useEffect(() => {
    dragElements.map((element: IElement) => {
      element.jump && updateDragElements(element.id, { ...element, jump: { ...jump, width: unit * element.jump.value } });
    });
  }, [unit]);

  return (
    <>
      <div
        ref={moveableRef}
        id={"dragElement-" + element.id}
        className={`flex absolute t-0 l-0 cursor-move ${jump.underRuler ? "flex-col-reverse" : "flex-col"} `}
        style={{
          width: unit * jump.value,
          transform: element.transform,
          zIndex: element.zIndex,
        }}
      >
        <JumpArrow underRuler={jump.underRuler} jumpWidth={jump.width} />
        <div id="dragElement-jumpBase" className={`${baseJumpClassName} ${jump.underRuler ? " bg-[#F48460] mb-[1rem]" : " bg-[#009FDE] mt-[1rem]"}`}>
          <span id="dragElement-jumpLength" className="cursor-pointer" onClick={() => setHideNumber(!hideNumber)}>
            {hideNumber ? "?" : typeRuler != LineRange.hundredCircular ? jump.value : jump.value * 10}
          </span>
        </div>
      </div>
      <div id={`dragElement-jump-${jump.underRuler ? "under" : "on"}${click ? "-click" : "-notclick"}`}>
        <MoveableElement moveableRef={moveableRef} element={element} unit={unit} />
      </div>
    </>
  );
};
export default Jump;
