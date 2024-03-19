import JumpArrow from "./JumpArrow";
import MoveableElement from "./MoveableElement";
import React, { useEffect, useState } from "react";
import { IElement } from "../../type/moveable";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/ruler";
import { baseJumpClassName } from "../../styles/jump";
import { dragElementID } from "../../consts/elementConsts";

interface IProps {
  element: IElement;
  unit: number;
}
const Jump = ({ element, unit }: IProps) => {
  const { rulerType, idDraggElementClick } = useNumbersLineContext();
  const [hideNumber, setHideNumber] = useState(true);
  const [click, setClick] = useState(false);
  const moveableRef = React.useRef<HTMLDivElement>(null);
  const jump = element.jump!;

  useEffect(() => {
    setClick(idDraggElementClick === element.id);
  }, [idDraggElementClick]);

  return (
    <>
      <div
        ref={moveableRef}
        id={dragElementID + "-" + element.id}
        className={`drag-element cursor-move ${jump.underRuler ? "flex-col-reverse" : "flex-col"} `}
        style={{
          width: unit * jump.value,
          transform: element.transform,
          zIndex: element.zIndex,
        }}
      >
        <JumpArrow underRuler={jump.underRuler} jumpWidth={moveableRef.current ? moveableRef.current.getBoundingClientRect().width : unit * jump.value} />
        <div id={`${dragElementID}-jumpBase`} className={`${baseJumpClassName} ${jump.underRuler ? " bg-[#F48460] mb-[1rem]" : " bg-[#009FDE] mt-[1rem]"}`}>
          <span id={`${dragElementID}-jumpLength`} className="cursor-pointer" onClick={() => setHideNumber(!hideNumber)}>
            {hideNumber ? "?" : rulerType != LineRange.hundredCircular ? jump.value : jump.value * 10}
          </span>
        </div>
      </div>
      <div id={`${dragElementID}-jump-${jump.underRuler ? "under" : "on"}${click ? "-click" : "-notclick"}`}>
        <MoveableElement moveableRef={moveableRef} element={element} unit={unit} />
      </div>
    </>
  );
};
export default Jump;
