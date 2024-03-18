import { IElement } from "../type/moveable";
import { useRef } from "react";
import MoveableElement from "./MoveableElement";
import navi from "/assets/icons/naviOnScreen.svg";
import keni from "/assets/icons/keniOnScreen.svg";
import { NaviKeniIconsTypes } from "../type/elements";

interface IProps {
  element: IElement;
  unit: number;
}

const NaviKany = ({ element, unit }: IProps) => {
  const moveableRef = useRef<any>(null);

  return (
    <>
      <img
        ref={moveableRef}
        id={`dragElement-${element.id}`}
        src={element.icons?.type == NaviKeniIconsTypes.navi ? navi : keni}
        className="flex absolute t-0 l-0 cursor-move"
        style={{
          transform: element.transform,
          width: unit * element.icons!.widthRelatively,
          zIndex: element.zIndex,
        }}
      />
      <div id="dragElement-naviKeni">
        <MoveableElement moveableRef={moveableRef} element={element} unit={unit} />
      </div>
    </>
  );
};
export default NaviKany;
