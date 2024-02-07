import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnResize, OnResizeEnd } from "react-moveable";
import { IElement } from "../type/elements";
import { calculatRulerWidth } from "../lib/utils";
import { RulerHeight, RulerPadding } from "../consts/elementConsts";

interface IProps {
  targetRef: any;
  element: IElement;
  unit: number;
  underRuler: boolean;
  setUnderRuler: (v: boolean) => void;
}

const MoveableElement = ({ targetRef, element, unit, underRuler, setUnderRuler }: IProps) => {
  const { windowWidth, dragElements, setDragElements } = useNumbersLineContext();

  const hideValueElement = () => {
    let newElements = dragElements.map((item: IElement) => (item.id === element.id ? { ...item, hideNumber: true } : item));
    setDragElements(newElements);
  };
  const changeElementValue = (e: OnResizeEnd) => {
    let newValue = Math.round(e.lastEvent.width / unit);
    let newElements = dragElements.map((item: IElement) => (item.id === element.id ? { ...item, value: newValue } : item));
    setDragElements(newElements);
    e.target.style.width = `${newValue * unit}px`;
  };

  const updateTransform = (e: OnResize) => {
    if (
      !(parseFloat(e.target.style.width) / unit < 1 && e.dist[0] < 0) &&
      !(parseFloat(e.target.style.width) > calculatRulerWidth(windowWidth, RulerPadding) && e.dist[0] > 0)
    ) {
      e.target.style.width = `${e.width}px`;
      e.target.style.transform = e.drag.transform;
    }
  };

  const updateJumpByYLocation = (e: any) => {
    const rulerLocation = window.innerHeight * ((100 - RulerHeight) / 100);
    if (underRuler != rulerLocation < e.clientY) {
      let originalString = e.target.style.transform;
      let match = originalString.match(/,\s*(\d+)px\)/);
      const bottonPX = parseFloat(match[1]);
      let bottonPXString = match[0];
      if (rulerLocation < e.clientY) {
        setUnderRuler(true);
        let newBottonPXString = ", " + Math.round(bottonPX + 80).toString() + "px)";
        e.target.style.transform = e.target.style.transform.replace(bottonPXString, newBottonPXString);
      } else {
        setUnderRuler(false);
        let newBottonPXString = ", " + Math.round(bottonPX - 80).toString() + "px)";
        e.target.style.transform = e.target.style.transform.replace(bottonPXString, newBottonPXString);
      }
    }
  };

  return (
    <Moveable
      target={targetRef}
      draggable={true}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
      }}
      onDragEnd={(e) => updateJumpByYLocation(e)}
      resizable={true}
      renderDirections={["w", "e"]}
      onResizeStart={() => hideValueElement()}
      onResize={(e) => updateTransform(e)}
      onResizeEnd={(e) => changeElementValue(e)}
    />
  );
};

export default MoveableElement;
