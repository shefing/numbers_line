import { IElement } from "../type/moveable";
import { useRef } from "react";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { keniWidth, naviWidth } from "../consts/elementConsts";
import navi from "/assets/icons/naviOnScreen.svg";
import keni from "/assets/icons/keniOnScreen.svg";
import { NaviKeniIconsTypes } from "../type/elements";
import { unitAmount } from "../type/ruler";
import { useHelpers } from "@/hooks/useHelpers";

interface IProps {
  element: IElement;
  unit: number;
}

const NaviKany = ({ element, unit }: IProps) => {
  const { idDraggElementClick } = useNumbersLineContext();
  const { calculatUnitsAmount } = useHelpers();
  const moveableRef = useRef<any>(null);

  const calculatIconWidth = () => {
    const width = element.icons?.type == NaviKeniIconsTypes.navi ? naviWidth * unit : keniWidth * unit;
    if (calculatUnitsAmount() == unitAmount.twenty) return width * 2;
    return width;
  };

  return (
    <>
      <img
        ref={moveableRef}
        id={`dragElement-${element.id}`}
        src={element.icons?.type == NaviKeniIconsTypes.navi ? navi : keni}
        className={`flex absolute t-0 l-0 ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{
          transform: element.transform,
          width: calculatIconWidth(),
        }}
      />
      <div id="dragElement-naviKeni">
        <MoveableElement moveableRef={moveableRef} element={element} unit={unit} />
      </div>
    </>
  );
};
export default NaviKany;
