import JumpArrow from "./JumpArrow";
import MoveableElement from "./MoveableElement";
import React, { useEffect, useState } from "react";
import { IElement } from "../../type/moveable";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { LineRange } from "../../type/ruler";
import { dragElementID } from "../../consts/elementConsts";

interface IProps {
  element: IElement;
}
const Jump = ({ element }: IProps) => {
  const { rulerType, unit, idDraggElementClick } = useNumbersLineContext();
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
        <JumpArrow element={element} jumpWidth={moveableRef.current ? moveableRef.current.getBoundingClientRect().width : unit * jump.value} />
        <div
          id={`${dragElementID}-jumpBase`}
          className={`jump-base ${jump.minus ? " bg-[#F48460] bg-opacity-85 " : " bg-[#009FDE] bg-opacity-85 "}${jump.underRuler ? " mb-[1rem]" : " mt-[1rem]"}`}
        >
          <span id={`${dragElementID}-jumpLength`} className="cursor-pointer" onClick={() => setHideNumber(!hideNumber)}>
            {hideNumber ? "?" : rulerType != LineRange.hundredCircular ? jump.value : jump.value * 10}
          </span>
        </div>
      </div>
      <div id={`${dragElementID}-jump-${jump.underRuler ? "under" : "on"}${click ? "-click" : "-notclick"}`}>
        <MoveableElement moveableRef={moveableRef} element={element} />
      </div>
    </>
  );
};
export default Jump;
