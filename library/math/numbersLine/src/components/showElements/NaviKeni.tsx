import { IElement } from "../../type/moveable";
import { useRef } from "react";
import MoveableElement from "./MoveableElement";
import navi from "/assets/icons/naviOnScreen.svg";
import keni from "/assets/icons/keniOnScreen.svg";
import { NaviKeniIconsTypes } from "../../type/toolbar";
import { dragElementID } from "../../consts/elementConsts";
import { useNumbersLineContext } from "@/context/numbersLineContext";

interface IProps {
  element: IElement;
}

const NaviKany = ({ element }: IProps) => {
  const { unit } = useNumbersLineContext();
  const moveableRef = useRef<any>(null);

  return (
    <>
      <img
        ref={moveableRef}
        id={`${dragElementID}-${element.id}`}
        src={element.icons?.type == NaviKeniIconsTypes.navi ? navi : keni}
        className="drag-element cursor-move"
        style={{
          transform: element.transform,
          width: unit * element.icons!.widthRelatively,
          zIndex: element.zIndex,
        }}
      />
      <div id={`${dragElementID}-naviKeni`}>
        <MoveableElement moveableRef={moveableRef} element={element} />
      </div>
    </>
  );
};
export default NaviKany;
