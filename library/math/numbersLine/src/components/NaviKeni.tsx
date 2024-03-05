import { IElement } from "../type/moveable";
import { useEffect, useRef } from "react";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { keniWidth, naviWidth } from "../consts/elementConsts";
import navi from "/assets/icons/naviOnScreen.svg";
import keni from "/assets/icons/keniOnScreen.svg";
import { NaviKeniIconsTypes } from "../type/elements";
import { LineRange, RulerLenth } from "../type/ruler";
import { useHelpers } from "../hooks/useHelpers";

interface IProps {
  element: IElement;
  unit: number;
  setUnit: (v: number) => void;
}

const NaviKany = ({ element, unit, setUnit }: IProps) => {
  const { windowSize, typeRuler, idDraggElementClick } = useNumbersLineContext();
  const { calculatRulerWidth, calculatUnitsAmount } = useHelpers();
  const moveableRef = useRef<any>(null);

  useEffect(() => {
    let unitWidth = calculatRulerWidth() / calculatUnitsAmount();
    setUnit(unitWidth);
    typeRuler == LineRange.hundred && setUnit(windowSize.width / RulerLenth.hundred);
  }, [typeRuler, windowSize]);

  return (
    <>
      <img
        ref={moveableRef}
        id={`dragElement-${element.id}`}
        src={element.icons?.type == NaviKeniIconsTypes.navi ? navi : keni}
        className={`flex absolute t-0 l-0 ${idDraggElementClick == element.id ? "cursor-move" : "cursor-pointer"}`}
        style={{
          transform: element.transform,
          width: element.icons?.type == NaviKeniIconsTypes.navi ? naviWidth : keniWidth,
        }}
      />
      {idDraggElementClick === element.id && (
        <div id="dragElement-text">
          <MoveableElement moveableRef={moveableRef} element={element} unit={unit} />
        </div>
      )}
    </>
  );
};
export default NaviKany;
