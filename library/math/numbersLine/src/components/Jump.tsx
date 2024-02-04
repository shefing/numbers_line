import jumpArrowPlus from "/assets/icons/jumpArrowPlus.svg";
import React from "react";
import { IElement } from "@/type/elements";
import { baseJumpClassName } from "@/styles/jump";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "@/context/numbersLineContext";

interface IProps {
  element: IElement;
  idClick: number;
}

const Jump = ({ idClick, element }: IProps) => {
  const { dragElements, setDragElements } = useNumbersLineContext();
  const targetRef = React.useRef<any>(null);
  const changeHidenumbers = () => {
    let newelements = dragElements.map((item: IElement) => (item.id === idClick ? { ...item, hideNumber: !item.hideNumber } : item));
    setDragElements(newelements);
  };
  return (
    <>
      <div ref={targetRef} className="absolute top-[35%] left-[50%] w-[134px] h-[124px]">
        <img src={jumpArrowPlus} alt="Menu Arroa" />
        <div className={baseJumpClassName} onClick={() => changeHidenumbers()}>
          {element.hideNumber ? "?" : element.value}
        </div>
      </div>
      {idClick == element.id && <MoveableElement targetRef={targetRef} />}
    </>
  );
};

export default Jump;
